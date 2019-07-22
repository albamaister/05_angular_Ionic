import { Component, OnInit } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  lista: Lista;
  nombreItem = '';
  constructor( private deseosService: DeseosService, 
               private route: ActivatedRoute ) {
    const listaId =  route.snapshot.paramMap.get('listaId');
    this.lista = this.deseosService.obtenerLista(listaId);
    console.log(this.lista);
  }

  ngOnInit() {
  }

  agregarItem() {
    if (this.nombreItem.length === 0 ) {
      return;
    }
    const  nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push( nuevoItem );
    this.nombreItem = '';
    this.deseosService.guardarStrogae();
  }

  cambioCheck(item: ListaItem) {
    // pendientes: esto retorna un arrelo con todos los items que estan pendientes y dice cuantos hay
    const pendientes = this.lista.items.filter(itemData => {
      return !itemData.completado;
    }).length;
    if (pendientes === 0) { /* cuando ya no hay tareas pendientes */
      this.lista.terminadaEn = new Date();
      this.lista.completada = true;
    } else { /* en caso de que se quitara un elemento o una tarea entonces ya no estaria terminada */
      this.lista.terminadaEn = null;
      this.lista.completada = false;
    }
    this.deseosService.guardarStrogae();
    console.log(this.lista);
  }

}
