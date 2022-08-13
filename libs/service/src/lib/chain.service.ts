/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { ChainData, Payment } from '@vimbal/model';
import Vimbal from 'build/contracts/Vimbal.json';
import { AuthService } from './auth.service';
declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}
@Injectable({
  providedIn: 'root',
})
export class ChainService {
  ganacheUrl = 'http://127.0.0.1:7545';

  constructor(private _authService: AuthService) {}

  async getBlockchainData(): Promise<Partial<ChainData>> {
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    const networkData = Vimbal.networks[5777 || networkId];
    return new web3.eth.Contract(Vimbal.abi, networkData.address);
  }

  async tipAuthor(id?: string, tipAmount?: any): Promise<Payment> {
    const account = await this._authService.getWalletAddress();
    const vimbalContract = await this.getBlockchainData();
    const payment = vimbalContract.methods.tipFileOwner(id).send({
      from: account,
      value: tipAmount,
    });

    return payment as Payment;
  }
}
