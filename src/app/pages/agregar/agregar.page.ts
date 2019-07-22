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

}
