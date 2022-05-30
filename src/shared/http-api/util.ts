import {HttpHeaders, HttpParams} from '@angular/common/http';

// import { pipe, range, timer, zip, ObservableInput, Observable } from 'rxjs';
// import { ajax } from 'rxjs/ajax';
// import { retryWhen, map, mergeMap } from 'rxjs/operators';
 
// function backoff(maxTries, ms) {
//  return pipe(
//    retryWhen((attempts: ObservableInput<number>) => range(1, maxTries)
//      .pipe(
//        zip<number, any>(attempts, (i: number) => i),
//        map(ii => i * i),
//        mergeMap(i =>  timer(i * ms))
//      )
//    )
//  );
// }

export class HttpUtil {
  static formHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    })
  };

  /**
   * 将参数对象转化为查询参数
   * @param {Object} param
   * @returns {{params: HttpParams}}
   */
  static paramSerialize(param: any) {
    let params = new HttpParams();
    for (const p in param) {
      if (param.hasOwnProperty(p) && param[p] !== null) {
        if (typeof param[p] === 'string') {
          param[p] = param[p].trim();
          params = params.set(p, param[p]);
        } else if (param[p] instanceof Array) {
          params = params.set(p, param[p]);
        } else {
          params = params.set(p, param[p]);
        }
      }
    }
    return params;
  }
  /**
   * 将参数对象转化为查询参数
   */
  static setParams(paramsObject: any) {
    return {params: this.paramSerialize(paramsObject)};
  }

  /**
   * http post form data format
   * @param obj
   * @param {boolean} needTrim
   * @returns {string}
   */
  static param = (obj: any) => {
    let query = '',
      name, value, fullSubName, subName, subValue, innerObj: any, i;
    for (name in obj) {
      if (obj.hasOwnProperty(name) && obj[name] !== null) {
        value = obj[name];
        if (value instanceof Array) {
          for (i = 0; i < value.length; ++i) {
            query += name + '=' + value[i] + '&';
          }
        } else if (value instanceof Object) {
          for (subName in value) {
            if (value.hasOwnProperty(subName)) {
              if (value[subName].hasOwnProperty('trim')) {
                subValue = value[subName].trim();
              }
              fullSubName = name + '[' + subName + ']';
              innerObj = {};
              innerObj[fullSubName] = subValue;
              query += this.param(innerObj) + '&';
            }
          }
        } else if (value !== undefined && value !== null) {
          query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }
      }
    }
    return query.length ? query.substr(0, query.length - 1) : query;
  };
}
