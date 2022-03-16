import { Injectable, NgZone } from '@angular/core';
import MetaMaskOnboarding from '@metamask/onboarding';
import { ethers } from 'ethers';
import Vimbal from 'build/contracts/Vimbal.json';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoggerService } from './logger.service';
import { ChainData } from '@vimbal/model';
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
  ganacheUrl = 'http://127.0.0.1:7545';

  onboarding = new MetaMaskOnboarding({
    // forwarderOrigin: this.forwarderOrigin,
  });

  provider = new ethers.providers.JsonRpcProvider(this.ganacheUrl);

  signer = this.provider.getSigner();

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

  async getUserWalletAddress() {
    return await this.signer.getAddress();
  }

  async getCurrentBlock() {
    return await this.provider.getBlockNumber();
  }

  async getBlockchainData(): Promise<ChainData> {
    const network = await this.provider.getNetwork();
    const networkData = Vimbal.networks[5777];
    const contract = new ethers.Contract(
      networkData.address,
      Vimbal.abi,
      this.signer
    );

    return { network, networkData, contract };
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
        this._loggerService.logInfo('Please connect your wallet.');
      } else {
        this._loggerService.logError(error.message);
      }
    }
  }
}
