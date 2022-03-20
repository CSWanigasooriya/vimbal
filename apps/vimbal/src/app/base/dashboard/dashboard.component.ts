/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { ChainData, FileContract, WithDateFormat } from '@vimbal/model';
import { AuthService, ChainService, IpfsService } from '@vimbal/service';

@Component({
  selector: 'vimbal-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public isLoading = true;
  public userWalletAddress!: string;
  public currentBlockNumber!: number;
  public chainData!: ChainData;
  public files: WithDateFormat<FileContract>[] = [];

  constructor(
    private _authService: AuthService,
    private _chainService: ChainService,
    private _ipfsService: IpfsService
  ) {
    this._authService.getUserWalletAddress().then((address) => {
      this.userWalletAddress = address;
    });

    this._chainService.getCurrentBlock().then((blockNumber) => {
      this.currentBlockNumber = blockNumber;
    });

    this._chainService.getBlockchainData().then(async (data: any) => {
      this.isLoading = false;
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
      title: file.title,
      description: file.description,
      tipAmount: parseInt(file.tipAmount.toString(), 16),
      timestamp: new Date(parseInt(file.timestamp.toString(), 16)),
      owner: file.owner,
    } as WithDateFormat<FileContract>;
  }
}
