import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { MapModule } from 'src/shared/map/map.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { ChartModule } from 'src/shared/chart/chart.module';
@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    MapModule,
    ChartModule,
    SharedModule,
    NzIconModule,
    NzModalModule,
    NzToolTipModule,
    NzRateModule,
    RouterModule.forChild([{
      path: '',
      component: HomeComponent,
    }, {
      path: '**',
      pathMatch: 'full',
      redirectTo: ''
    }])
  ],
})
export class HomeModule { }
