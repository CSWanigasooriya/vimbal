import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class SplashScreenStateService {
  subject = new Subject()

  stop() {
    this.subject.next(false)
  }
}
