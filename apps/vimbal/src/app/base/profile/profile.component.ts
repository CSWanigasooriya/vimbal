import { Component, OnInit } from '@angular/core';
import { AuthService } from '@vimbal/service';

@Component({
  selector: 'vimbal-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  walletAddress!: string;
  walletBalance!: string;

  constructor(private _authService: AuthService) {}

  async ngOnInit() {
    this.walletAddress = await this._authService.getWalletAddress();
    this.walletBalance = await this._authService.getWalletBalance();
  }
}
