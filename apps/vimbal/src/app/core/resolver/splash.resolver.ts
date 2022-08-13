import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SplashResolver implements Resolve<Observable<any>> {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<Observable<any>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(of(null));
      }, 5000);
    });
  }
}
