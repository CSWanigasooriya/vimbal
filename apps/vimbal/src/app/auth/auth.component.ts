import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '@vimbal/service';
import { Observable } from 'rxjs';

@Component({
  selector: 'vimbal-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  theme$: Observable<boolean>;

  constructor(
    private store: Store<{ count: number; theme: boolean }>,
    private _authService: AuthService
  ) {
    this.theme$ = this.store.select('theme');
  }

  connectMetaMask() {
    this._authService.requestWalletPermission();
    // this._authService.metaMaskStartOnBoarding();
    this._authService.getMetaMaskAccounts().then((accounts) => {
      console.log(accounts);
    });
  }
}
