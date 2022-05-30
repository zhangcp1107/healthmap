import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { HttpUtil } from 'src/shared/http-api/util';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {
  }

  getAlerts(data: {
  }) {
    return this.http.get<any>(environment.api + 'alerts', HttpUtil.setParams({
      diseases: 'Norovirus;COVID-19',
      dateS: '2020-1-1',
      dateE: '2022-5-28',
      places: 'Michigan, United States;Italy',
      sources: 'Google News;Google 资讯'
    }));
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
