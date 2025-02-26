import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor( public deseosService: DeseosService,
               private router: Router,
               private alertCtrl: AlertController) {

  }
  async agregarLista() { /* el async transforma todo el metodo en una promesa */
    const alert = await this.alertCtrl.create({
      /* el await dice que se espere a que toda la promesa se ejecute y el resultado lo almacene en la const */
      header: 'Nueva lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Crear',
          handler: ( data ) => {
            console.log(data);
            if ( data.titulo.length === 0 ) {
              return;
            }
            const listaId = this.deseosService.crearLista(data.titulo);
            this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
            }
        }
      ]
    });

    alert.present();
  }

}
