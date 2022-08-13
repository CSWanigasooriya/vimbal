import { of } from 'rxjs';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChainData, FileContract, ReviewContract } from '@vimbal/model';
import { AuthService, ChainService, ReviewService } from '@vimbal/service';

@Component({
  selector: 'vimbal-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  fileId!: number;
  file!: FileContract;
  isLoading = true;
  symKeyId!: string;
  reviewData!: ChainData;
  reviews: ReviewContract[] = [];
  ngReviewTextModel = '';
  ratingValue = 0;
  walletAddress!: string;

  constructor(
    private _route: ActivatedRoute,
    private _chainService: ChainService,
    private _reviewService: ReviewService,
    private _authService: AuthService
  ) {
    this.fileId = Number(this._route.snapshot.paramMap.get('id'));
    this._reviewService.getAllReviews().then(async (data: any) => {
      if (data) this.isLoading = false;
      this.reviewData = data;
      const reviewCount = await this.reviewData?.methods?.reviewCount().call();
      const fileCountInt = parseInt(reviewCount, 16);
      for (let index = 1; index <= fileCountInt; index++) {
        const review = await this.reviewData.methods
          ?.reviews(this.fileId, index)
          .call();
        if (review?.id != 0) this.reviews = [...this.reviews, review];
      }
    });
  }

  async ngOnInit() {
    this.getFile();
    // this._reviewService.createReview(this.fileId, 'test');
    this._reviewService.deleteReview(this.fileId, 1);

    this.walletAddress = await this._authService.getWalletAddress();
  }

  onRatingSet(rating: number): void {
    this.ratingValue = rating;
  }

  getFile() {
    this._chainService.getBlockchainData().then(async (data: any) => {
      this.file = await data.methods.files(this.fileId).call();
    });
  }

  getIpfsUri() {
    return `https://ipfs.io/ipfs/${this.file?.hash}`;
  }

  contentLoaded() {
    this.isLoading = false;
  }

  decodeData(data?: string) {
    return data ? window.atob(data) : '';
  }

  createReview() {
    this._reviewService
      .createReview(
        this.fileId,
        this.ngReviewTextModel,
        this.ratingValue?.toString()
      )
      .then(() => {
        window.location.reload();
      });
  }

  isOwner() {
    return of(this.file?.owner.toString() === this.walletAddress);
  }
}