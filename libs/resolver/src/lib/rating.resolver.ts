/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { FirestoreService } from '@vimbal/service'
import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class RatingResolver implements Resolve<Promise<Observable<number>>> {
  constructor(private _firestoreService: FirestoreService) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<Observable<number>> {
    const fileId = Number(route.paramMap.get('id'))
    const score = await this._firestoreService.getAverageReviewScore(fileId)
    return of(score)
  }
}
