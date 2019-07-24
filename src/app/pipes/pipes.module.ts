import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// se borra el CommonModule porque no se va a utilizar ni el ngIf ni el ngFor ni etc
import { FiltroPipe } from './filtro.pipe';

@NgModule({
  declarations: [FiltroPipe],
  // imports: [
  //   CommonModule
  // ]
  // como el FiltroPipe se se va a utilizar en otros componentes, en otros modulos,
  // fuera de este modulo se necesita exportarlo
  exports: [FiltroPipe]
})
export class PipesModule { }
