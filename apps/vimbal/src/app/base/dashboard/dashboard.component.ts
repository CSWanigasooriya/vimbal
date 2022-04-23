/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { ChainData, FileContract, ReviewContract } from '@vimbal/model';
import {
  AuthService,
  ChainService,
  IpfsService,
  ReviewService,
} from '@vimbal/service';

@Component({
  selector: 'vimbal-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  isLoading = true;
  userWalletAddress!: string;
  currentBlockNumber!: number;
  chainData!: ChainData;
  reviewData!: ChainData;
  reviewsByOwner: ReviewContract[] = [];
  files: FileContract[] = [];
  selectedTabIndex = 0;

  constructor(
    private _authService: AuthService,
    private _chainService: ChainService,
    private _ipfsService: IpfsService,
    private _reviewService: ReviewService
  ) {
    this._chainService.getBlockchainData().then(async (data: any) => {
      if (data) this.isLoading = false;
      this.chainData = data;
      const fileCount = await this.chainData?.methods?.fileCount().call();
      const fileCountInt = parseInt(fileCount, 16);
      for (let index = 1; index <= fileCountInt; index++) {
        const file = await this.chainData.methods?.files(index).call();
        this.files = [...this.files, this.formatFileData(file)].sort(
          (a, b) => b.tipAmount - a.tipAmount
        );
      }
    });

    this._reviewService.getAllReviews().then(async (data: any) => {
      if (data) this.isLoading = false;
      this.reviewData = data;
      this.userWalletAddress = await this._authService.getWalletAddress();
      const reviewCount = await this.reviewData?.methods?.reviewCount().call();
      const fileCountInt = parseInt(reviewCount, 16);
      for (let index = 1; index <= fileCountInt; index++) {
        const review = await this.reviewData.methods
          ?.reviewsByOwner(this.userWalletAddress, index)
          .call();
        if (review?.id != 0)
          this.reviewsByOwner = [...this.reviewsByOwner, review];
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
      owner: file.owner,
    } as FileContract;
  }
}
