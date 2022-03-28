/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { ChainData, FileContract, IpfsReceipt } from '@vimbal/model';
import { Buffer } from 'buffer';
import { create } from 'ipfs-http-client';
import { BehaviorSubject } from 'rxjs';
import { ChainService } from './chain.service';

@Injectable({
  providedIn: 'root',
})
export class IpfsService {
  private ipfsReceipt: BehaviorSubject<Partial<IpfsReceipt>> =
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
        const isFileOwned = await this.chainData.methods
          .isFileOwned(response.path)
          .call();

        if (response && !isFileOwned) {
          await this.chainData.methods
            ?.uploadFile(
              response.path,
              file.title,
              file.authors,
              file.keywords,
              file.description //abstract
            )
            .send({ from: accounts[0] });
          // .on('transactionHash', (hash: any) => {
          //   this.ipfsReceipt.next(response);
          // });
          this.ipfsReceipt.next(response);
        } else {
          alert('File already owned by another author');
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return this.ipfsReceipt.value;
  }
}
