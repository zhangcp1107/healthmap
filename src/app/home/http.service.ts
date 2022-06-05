import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { HttpUtil } from 'src/shared/http-api/util';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {
  }

  getAlerts(data: {
    diseases?: any
    dateS?: any
    dateE?: any
    places?: any
    sources?: any
  }) {
    return this.http.get<any>(environment.api + 'alerts/get', HttpUtil.setParams(data));
  }

  getDiseases() {
    return this.http.get<any>(environment.api + 'diseases');
  }

  getPlaces() {
    return this.http.get<any>(environment.api + 'places');
  }

  getSources() {
    return this.http.get<any>(environment.api + 'sources');
  }

  getSpecies() {
    return this.http.get<any>(environment.api + 'species');
  }

  deleteAlert(id: string) {
    return this.http.get<any>(environment.api + 'admin/alert/delete', HttpUtil.setParams({id}));
  }

  createAlert(data: any) {
    return this.http.post<any>(environment.api + 'alert/create', data);
  }
}
