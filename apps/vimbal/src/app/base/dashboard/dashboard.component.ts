/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import {
  ChainData,
  FileContract,
  FormatedTimestampFileContract,
} from '@vimbal/model';
import { AuthService, IpfsService } from '@vimbal/service';

@Component({
  selector: 'vimbal-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public userWalletAddress!: string;
  public currentBlockNumber!: number;
  public chainData!: ChainData;
  public files: FormatedTimestampFileContract[] = [];

  constructor(
    private _authService: AuthService,
    private _ipfsService: IpfsService
  ) {
    this._authService.getUserWalletAddress().then((address) => {
      this.userWalletAddress = address;
    });

    this._authService.getCurrentBlock().then((blockNumber) => {
      this.currentBlockNumber = blockNumber;
    });

    this._authService.getBlockchainData().then(async (data: any) => {
      this.chainData = data;
      const fileCount = await this.chainData.contract.fileCount();
      const fileCountInt = parseInt(fileCount, 16);

      for (let index = 1; index <= fileCountInt; index++) {
        const file = await this.chainData.contract['files'](index);

        this.files = [...this.files, this.formatFileData(file)];
      }
    });
  }

  formatFileData(file: FileContract) {
    return {
      id: parseInt(file.id.toString(), 16),
      hash: file.hash,
      description: file.description,
      tipAmount: parseInt(file.tipAmount.toString(), 16),
      timestamp: new Date(parseInt(file.timestamp.toString(), 16)),
      author: file.author,
    };
  }
}
