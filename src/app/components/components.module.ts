import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListasComponent } from './listas/listas.component';
// el CommonModule nos sirve si vamos a usar el ngIf, ngFor, etc

@NgModule({
  declarations: [
    ListasComponent
  ],
  exports: [
    ListasComponent
  ],
  // los exports son todas las cosas que son propias de este modulo que van a ser necesarias 
  // si se va a trabajar con este modulo de forma externa
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
