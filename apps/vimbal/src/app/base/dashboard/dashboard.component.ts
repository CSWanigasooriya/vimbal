import { AuthService } from './../../../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'vimbal-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private _authService: AuthService) {}

  metamask() {
    this._authService.isMetaMaskInstalled();
    // this._authService.metaMaskStartOnBoarding();
    this._authService.getMetaMaskAccounts().then((accounts) => {
      console.log(accounts);
    });
  }
}
