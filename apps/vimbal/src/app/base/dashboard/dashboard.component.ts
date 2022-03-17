/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy } from '@angular/core';
import { ChainData, FileContract, IpfsReceipt } from '@vimbal/model';
import { AuthService, IpfsService } from '@vimbal/service';
import { Buffer } from 'buffer';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'vimbal-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnDestroy {
  public userWalletAddress!: string;
  public currentBlockNumber!: number;
  public chainData!: ChainData;
  public files: FileContract[] = [];
  public ipfsReceipt: BehaviorSubject<Partial<IpfsReceipt>> =
    new BehaviorSubject({} as Partial<IpfsReceipt>);

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

      for (let index = 0; index <= fileCountInt; index++) {
        const file = await this.chainData.contract['files'](index);

        this.files = [...this.files, this.formatFileData(file)];
      }
    });
  }

  ngOnDestroy(): void {
    this.ipfsReceipt.unsubscribe();
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
      this._ipfsService.uploadFile(buffer).then((res) => {
        this.ipfsReceipt.next(res);
      });
    };
  }

  formatFileData(file: FileContract) {
    return {
      id: parseInt(file.id.toString(), 16),
      hash: file.hash,
      description: file.description,
      tipAmount: parseInt(file.tipAmount.toString(), 16),
      timestamp: parseInt(file.timestamp.toString(), 16),
      author: file.author,
    };
  }

  getIpfsUri(hash?: string) {
    return hash
      ? `https://ipfs.infura.io/ipfs/${hash}`
      : `https://ipfs.infura.io/ipfs/QmYrMrdam6mkYja2Sq4DcZ4eZPo23yMUiQ5tt2GqAEBZ1g`;
  }
}
