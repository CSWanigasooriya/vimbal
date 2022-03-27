/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { ChainData, FileContract, IpfsReceipt } from '@vimbal/model';
import { Buffer } from 'buffer';
import { create } from 'ipfs-http-client';
import { BehaviorSubject } from 'rxjs';
import { ChainService } from './chain.service';

declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}
@Injectable({
  providedIn: 'root',
})
export class IpfsService {
  public ipfsReceipt: BehaviorSubject<Partial<IpfsReceipt>> =
    new BehaviorSubject({} as Partial<IpfsReceipt>);

  chainData!: ChainData;
  // connect to the default API address http://localhost:5001
  client = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

  constructor(private _chainService: ChainService) {
    this._chainService.getBlockchainData().then((data: any) => {
      this.chainData = data;
    });
  }

  async uploadFile(buffer: Buffer, file: FileContract) {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    console.log('Uploading file to ipfs...');
    await this.client
      .add(buffer)
      .then(async (response) => {
        const upload = await this.chainData.methods
          ?.uploadFile(
            response.path,
            file.title,
            file.authors,
            file.keywords,
            file.description //abstract
          )
          .send({ from: accounts[0] });
        await upload.wait();
        this.ipfsReceipt.next(response);
      })
      .catch((err) => {
        console.log(err);
      });

    return this.ipfsReceipt.value;
  }
}
