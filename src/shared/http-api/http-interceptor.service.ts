import {Injectable, Injector} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {tap, catchError, timeout} from 'rxjs/operators';
import {MessageService} from '../message/message.service';
import {TranslateService} from '@ngx-translate/core';
import {backoff} from './backoff';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private router: Router,
              private message: MessageService,
              private translateService: TranslateService,
              private injector: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let user: any = {};
    try {
      user = JSON.parse(window.localStorage.getItem('f6swd3e45f345sf3') || '{}');
    } catch (error) {
      window.localStorage.removeItem('f6swd3e45f345sf3');
    }
    let token = user ? user.user_token : '';
    if (!token&&req.url!="/api/user/login_user") {this.router.navigate(['/login']);}
    req = req.clone({
      // withCredentials: true,
      setHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'If-Modified-Since': '0'
      },
      body: req.body ? {...req.body, token: token} : '"' + token + '"'
    });
    return next
      .handle(req)
      .pipe(
        timeout(2000),
        catchError((err, caught) => {
          if (err.status === 0) {
            this.message.error(this.translateService.instant('网络不在线！'));
            // 取消请求
            return of(new HttpResponse());
          } else if (err.name === 'TimeoutError') {
            // 重试
            return caught;
          }
          // 取消请求
          return of(new HttpResponse());
        })
      )
      // .pipe(backoff(3, 250))
      .pipe(tap((res: HttpResponse<any>) => {
        // if (res && res.body && res.body.code === 500) {
        //   this.message.error(this.translateService.instant('未知异常，请联系管理员！'))
        // }
        // 定义: 401为未登录状态, 跳转登录
        if (res && res.body && res.body.code === 401) {
          this.router.navigate(['/login']);
        }
        return of(res);
      }, (error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse && error.status === 403) {
          this.router.navigate(['/login']);
        }
      }));
  }
}

