import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { G2MiniComponent } from './g2-mini/g2-mini.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    G2MiniComponent
  ],
  exports: [
    G2MiniComponent
  ]
})
export class ChartModule { }
