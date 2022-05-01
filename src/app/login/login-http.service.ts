import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable, Observer } from 'rxjs';
/**
 * 登录模块调用接口API的服务
 */
@Injectable()
export class LoginHttpService {
  constructor(private http: HttpClient) {
  }
  /**
   * 登录
   * @param data 
   */
  login(data: {
    user_name: string,
    user_pwd: string
  }) {
    // return this.http.post<any>(environment.api + 'user/login_user', data);
    return Observable.create((observer: Observer<any>) => {
      setTimeout(() => {
        observer.next({
          code: 200
        });
        observer.complete();
      }, 1500);  
    });
  }

  /**
   * 注册
   */
  register(data: {
    mobile: string,
    password: string
  }) {
    return this.http.post<any>(environment.api + 'user/insert_user', data);
  }
}
