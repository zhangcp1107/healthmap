import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpUtil} from '../util';

@Component({
  selector: 'qk-http-test',
  template: ``
})
export class AppComponent {
  constructor(private http: HttpClient) {
    /* post Form Data   'Content-Type':  'application/x-www-form-urlencoded; charset=UTF-8'   */
    this.http.post(
      '',
      HttpUtil.param({
        username: 'admin',
        password: 'adminA',
        lng: 'zh'
      }),
      HttpUtil.formHeader
    ).subscribe((res) => {
      console.warn(JSON.stringify(res));
    });

    /* post Form Data   'Content-Type':  'application/x-www-form-urlencoded; charset=UTF-8'   */
    this.http.post(
      '',
      HttpUtil.param({
        username: 'admin',
        password: 'adminA',
        lng: 'zh'
      }),
      Object.assign(HttpUtil.formHeader,
        // URL 传参 （安全性和参数大小：IE浏览器对URL的最大限制为2083个字符）
        HttpUtil.paramSerialize({
          username: 'admin',
          password: 'adminA',
          lng: 'zh'
        })
      )
    ).subscribe((res) => {
      console.warn(JSON.stringify(res));
    });

    /* post （angular default）    'Content-Type':  'application/json'         Java : 接口获取参数 @RequestBody   */
    this.http.post(
      '',
      {
        username: 'admin',
        password: 'adminA',
        lng: 'zh'
      },
      // URL 传参 （安全性和参数大小：IE浏览器对URL的最大限制为2083个字符）
      HttpUtil.setParams({
        username: 'admin',
        password: 'adminA',
        lng: 'zh'
      })
    ).subscribe((res) => {
      console.warn(JSON.stringify(res));
    });

    /* get URL 传参 （安全性和参数大小：IE浏览器对URL的最大限制为2083个字符）    */
    this.http.get(
      '',
      HttpUtil.setParams({
        username: 'admin',
        password: 'adminA',
        lng: 'zh'
      })).subscribe((res) => {
      console.warn(JSON.stringify(res));
    });
  }
}
