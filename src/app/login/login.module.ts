import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {LoginComponent} from './login/login.component';
import {SharedModule} from '../../shared/shared.module';
import {LoginHttpService} from './login-http.service';
import {BackgroundComponent} from './background/background.component';
/**
 * 登录模块
 */
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{
      path: '',
      component: BackgroundComponent,
      // children: [
      //   {path: '', component: LoginComponent},
      //   {path: '**', pathMatch: 'full', redirectTo: ''}
      // ]
    }, {path: '**', pathMatch: 'full', redirectTo: ''}])
  ],
  declarations: [
    BackgroundComponent,
    LoginComponent
  ],
  providers: [
    LoginHttpService
  ]
})
export class LoginModule {
}
