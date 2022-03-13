/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoggerService } from './logger.service';
import { Injectable, NgZone } from '@angular/core';
import MetaMaskOnboarding from '@metamask/onboarding';

declare global {
  interface Window {
    ethereum: any;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  forwarderOrigin = 'http://localhost:4200';

  onboarding = new MetaMaskOnboarding({
    // forwarderOrigin: this.forwarderOrigin,
  });

  constructor(private _ngZone: NgZone, private _loggerService: LoggerService) {}

  isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  metaMaskStartOnBoarding(): void {
    this._ngZone.runOutsideAngular(() => {
      this._ngZone.run(() => {
        this.onboarding.startOnboarding();
      });
    });
  }

  async getMetaMaskAccounts() {
    try {
      return await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error: any) {
      if (error.code === 4001) {
        // userRejectedRequest error
        this._loggerService.logInfo('Please connect to MetaMask.');
      } else {
        this._loggerService.logError(error.message);
      }
    }
  }

  async requestWalletPermission() {
    try {
      await window.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [
          {
            eth_accounts: {},
          },
        ],
      });
    } catch (error: any) {
      if (error.code === 4001) {
        // userRejectedRequest error
        this._loggerService.logInfo('Please connect to MetaMask.');
      } else {
        this._loggerService.logError(error.message);
      }
    }
  }
}
