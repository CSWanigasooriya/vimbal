import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService, StorageService } from '@vimbal/service';
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
    private _authService: AuthService,
    private _storageService: StorageService
  ) {
    this.theme$ = this.store.select('theme');
  }

  connectMetaMask() {
    // this._authService.requestWalletPermission();
    this._authService.getMetaMaskAccounts().then((accounts) => {
      if (!accounts) {
        this._authService.metaMaskStartOnBoarding();
      }
      this._storageService.set('accounts', accounts);
    });
  }
}
