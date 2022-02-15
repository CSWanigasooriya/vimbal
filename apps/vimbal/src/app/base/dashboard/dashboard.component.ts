import { Component } from '@angular/core';
import { AuthService } from '@vimbal/service';

@Component({
  selector: 'vimbal-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private _authService: AuthService) {}

  metamask() {
    this._authService.requestWalletPermission();
    // this._authService.metaMaskStartOnBoarding();
    this._authService.getMetaMaskAccounts().then((accounts) => {
      console.log(accounts);
    });
  }
}
