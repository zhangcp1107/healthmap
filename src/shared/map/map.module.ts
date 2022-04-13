import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { MapComponent } from './map/map.component';

@NgModule({
  imports: [
    CommonModule,
    NzModalModule
  ],
  declarations: [
    MapComponent
  ],
  exports: [
    MapComponent
  ]
})
export class MapModule { }
