import { Injectable, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChainData } from '@vimbal/model';
import Vimbal from 'build/contracts/Vimbal.json';
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

  async getBlockchainData(): Promise<Partial<ChainData>> {
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    console.log('networkId', networkId);
    const networkData = Vimbal.networks[5777 || networkId];
    return new web3.eth.Contract(Vimbal.abi, networkData.address);
  }
}
