/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChainData, IpfsReceipt } from '@vimbal/model';
import { Injectable } from '@angular/core';
import { Buffer } from 'buffer';
import { create } from 'ipfs-http-client';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class IpfsService {
  public ipfsReceipt: BehaviorSubject<Partial<IpfsReceipt>> =
    new BehaviorSubject({} as Partial<IpfsReceipt>);

  chainData!: ChainData;
  // connect to the default API address http://localhost:5001
  client = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

  constructor(private _authService: AuthService) {
    this._authService.getBlockchainData().then((data: any) => {
      this.chainData = data;
    });
  }

  async uploadFile(buffer: Buffer) {
    // call Core API methods
    await this.client.add(buffer).then(async (response) => {
      const upload = await this.chainData.contract.uploadFile(
        response.path,
        'description'
      );
      await upload.wait();
      this.ipfsReceipt.next(response);
    });

    return this.ipfsReceipt.value;
  }
}
