/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { ChainData, FileContract } from '@vimbal/model';
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
  public files: FileContract[] = [];

  constructor(
    private _authService: AuthService,
    private _chainService: ChainService,
    private _ipfsService: IpfsService
  ) {
    this._chainService.getBlockchainData().then(async (data: any) => {
      this.isLoading = false;
      this.chainData = data;
      const fileCount = await this.chainData.methods?.fileCount();
      const fileCountInt = parseInt(fileCount, 16);
      for (let index = 1; index <= fileCountInt; index++) {
        const file = await this.chainData.methods.files;
        this.files = [...this.files, this.formatFileData(file)];
      }
    });
  }

  formatFileData(file: FileContract) {
    return {
      id: parseInt(file.id.toString(), 16),
      hash: file.hash,
      title: file.title,
      authors: file.authors,
      keywords: file.keywords,
      description: file.description,
      tipAmount: parseInt(file.tipAmount.toString(), 16),
      timestamp: parseInt(file.timestamp.toString(), 16),
      owner: file.owner,
    } as FileContract;
  }
}
