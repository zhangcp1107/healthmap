import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { MapModule } from 'src/shared/map/map.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    MapModule,
    SharedModule,
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
