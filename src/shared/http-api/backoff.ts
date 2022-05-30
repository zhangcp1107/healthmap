/**
 * @author zhangchangping.work@foxmail.com
 * @date 2019/1/1
 * @description 指数化退避
 * 指数化退避是一种失败后重试 API 的技巧，它会在每次连续的失败之后让重试时间逐渐变长，超过最大重试次数之后就会彻底放弃。 如果使用承诺和其它跟踪 AJAX 调用的方法会非常复杂，而使用可观察对象，这非常简单：
 * Exponential backoff is a technique in which you retry an API after failure, making the time in between retries longer after each consecutive failure, with a maximum number of retries after which the request is considered to have failed. This can be quite complex to implement with promises and other methods of tracking AJAX calls. With observables, it is very easy:
 */
import { pipe, range, timer, zip } from 'rxjs';
import { retryWhen, map, mergeMap } from 'rxjs/operators';
 
export function backoff(maxTries, ms) {
 return pipe(
   retryWhen((attempts) => {
       return range(1, maxTries)
       .pipe(
        //  zip(attempts, (i) => i),
         map((i: number) => i * i),
         mergeMap(i =>  timer(i * ms))
       )
   })
 );
}