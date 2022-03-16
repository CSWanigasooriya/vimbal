import { OnInit } from '@angular/core';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { ChainData } from '@vimbal/model';
import { AuthService } from '@vimbal/service';
import { Buffer } from 'buffer';
import { create } from 'ipfs-http-client';

@Component({
  selector: 'vimbal-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public userWalletAddress!: string;
  public currentBlockNumber!: number;
  public chainData!: ChainData;
  public files!: any;
  // connect to the default API address http://localhost:5001
  client = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

  fileName = '';

  constructor(private _authService: AuthService) {
    _authService.getUserWalletAddress().then((address) => {
      this.userWalletAddress = address;
    });

    _authService.getCurrentBlock().then((blockNumber) => {
      this.currentBlockNumber = blockNumber;
    });

    _authService.getBlockchainData().then((data: any) => {
      this.chainData = data;
      const fileCount = this.chainData.contract.fileCount();

      for (let index = 0; index <= fileCount; index++) {
        const file = this.chainData.contract['files'](index);
        this.files = [...this.files, file];
      }
    });
  }

  //Convert to IPFS format
  captureFile(event: Event) {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      const buffer = Buffer.from(reader.result as ArrayBuffer);
      this.uploadFile(buffer);
    };
  }

  async uploadFile(buffer: Buffer) {
    // call Core API methods
    await this.client.add(buffer).then(async (res) => {
      console.log(res);
      const upload = await this.chainData.contract.uploadFile(
        res.path,
        'description'
      );
      const receipt = await upload.wait();
      console.log(receipt);
    });
  }
}
