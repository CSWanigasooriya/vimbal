/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class SplashResolver implements Resolve<Observable<unknown>> {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<Observable<unknown>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(of({}))
      }, 5000)
    })
  }
}
