import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';

@Component({
  selector: 'vimbal-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  theme$: Observable<boolean>;

  constructor(
    private store: Store<{ count: number; theme: boolean; sidebar: boolean }>
  ) {
    this.theme$ = store.select('theme');
  }
}
