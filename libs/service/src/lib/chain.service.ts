import { Injectable } from '@angular/core';
import { ChainData } from '@vimbal/model';
import Vimbal from 'build/contracts/Vimbal.json';
import { ethers } from 'ethers';
@Injectable({
  providedIn: 'root',
})
export class ChainService {
  ganacheUrl = 'http://127.0.0.1:7545';

  provider = new ethers.providers.JsonRpcProvider(this.ganacheUrl);

  signer = this.provider.getSigner();

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
}
