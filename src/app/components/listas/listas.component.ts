import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  @ViewChild (IonList) lista: IonList;
  @Input() terminada = true; // dependiendo del componente dice si esta en la pagina de terminados o pendientes
  constructor(public deseosService: DeseosService, private router: Router, private alertCtrl: AlertController ) { }

  ngOnInit() {}

  listaSeleccionada( lista: Lista) {
    if ( this.terminada ) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
    // console.log(lista);
  }

  eliminarLista(lista: Lista) {
    this.deseosService.eliminarLista( lista );
  }

  async editarLista(lista: Lista) { /* el async transforma todo el metodo en una promesa */
    const alert = await this.alertCtrl.create({
      /* el await dice que se espere a que toda la promesa se ejecute y el resultado lo almacene en la const */
      header: 'Editar lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista',
          value: lista.titulo
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.lista.closeSlidingItems();
            console.log('Cancelar');
          }
        },
        {
          text: 'Actualizar',
          handler: ( data ) => {
            console.log(data);
            if ( data.titulo.length === 0 ) {
              return;
            }
            lista.titulo = data.titulo;
            this.deseosService.guardarStrogae();
            this.lista.closeSlidingItems();
            // const listaId = this.deseosService.crearLista(data.titulo);
            // this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
            }
        }
      ]
    });

    alert.present();
  }

}
