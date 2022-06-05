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
    return this.http.post<any>(environment.api + '/user/login', {
      user: {
        email: data.user_name,
        // username: data.user_name,
        password: data.user_pwd
      }
    });
  }

  /**
   * 注册
   */
  register(data: {
    email: string,
    username: string,
    password: string
  }) {
    return this.http.post<any>(environment.api + '/user/create', {user: data});
  }
}
