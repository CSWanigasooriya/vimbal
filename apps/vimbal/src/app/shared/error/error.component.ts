import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'vimbal-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {
  theme$: Observable<boolean>;

  constructor(
    private store: Store<{ count: number; theme: boolean; sidebar: boolean }>
  ) {
    this.theme$ = this.store.select('theme');
  }
}
