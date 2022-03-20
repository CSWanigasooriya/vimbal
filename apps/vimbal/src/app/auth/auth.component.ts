import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '@vimbal/service';
import { Observable } from 'rxjs';

@Component({
  selector: 'vimbal-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  @ViewChild('container', { read: ElementRef, static: false })
  container!: ElementRef;

  theme$: Observable<boolean>;

  constructor(
    private store: Store<{ count: number; theme: boolean }>,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.theme$ = this.store.select('theme');
  }

  connectMetaMask() {
    this._authService.requestWalletPermission();
  }

  toggleClass() {
    this.container.nativeElement.classList.toggle('slide');
  }
}
