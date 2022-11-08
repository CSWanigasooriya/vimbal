import {
  ChainData,
  FileContract,
  FileContractWrapper,
  ReviewContract,
} from '@vimbal/model'
import {
  AuthService,
  FileService,
  FirestoreService,
  ReviewService,
} from '@vimbal/service'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MediaMatcher } from '@angular/cdk/layout'
import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  Optional,
} from '@angular/core'
import { FormControl } from '@angular/forms'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'
import { AppConfig, APP_CONFIG } from '../core/config/app.config'
import { mode } from '../core/state/theme/theme.actions'
import { Location } from '@angular/common'

import { ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'

@Component({
  selector: 'vimbal-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit, OnDestroy {
  fileId!: number
  file!: FileContractWrapper
  isLoading = true
  symKeyId!: string
  reviewData!: ChainData
  reviews: Array<ReviewContract> = []
  ngReviewTextModel = ''
  ratingValue = 0
  walletAddress!: string

  private subscriptions = new Subscription()

  mobileQuery: MediaQueryList
  theme$: Observable<boolean>
  searchControl = new FormControl('')
  filteredOptions!: Observable<FileContract[]>
  files: FileContract[] = []

  private _mobileQueryListener: () => void

  constructor(
    public location: Location,
    private _router: Router,
    private _firestoreService: FirestoreService,
    private _store: Store<{ count: number; theme: boolean; sidebar: boolean }>,
    @Optional() @Inject(APP_CONFIG) public config: AppConfig,
    media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef,
    private _route: ActivatedRoute,
    private _fileService: FileService,
    private _reviewService: ReviewService,
    private _authService: AuthService
  ) {
    this.fileId = Number(this._route.snapshot.paramMap.get('id'))
    this.theme$ = _store.select('theme')
    this.mobileQuery = media.matchMedia('(max-width: 600px)')
    this._mobileQueryListener = () => changeDetectorRef.detectChanges()
    this.mobileQuery.addEventListener('change', this._mobileQueryListener)
  }

  ngOnInit() {
    this.getWalletAddress()
    this.setFileData()
    this.setReviewData()
  }

  ngOnDestroy(): void {
    this.mobileQuery.addEventListener('change', this._mobileQueryListener)
    this.subscriptions.unsubscribe()
  }

  onSelectionChanged(event: { option: { id: unknown; value: unknown } }) {
    const selectedValue = event.option.id
    this._router.navigate(['/preview', selectedValue])
  }

  setReviewData() {
    this._reviewService.getReviewContract().then(async (data: any) => {
      if (data) this.isLoading = false
      this.reviewData = data
      const reviewCount = await this.reviewData?.methods?.reviewCount().call()
      const reviewCountInt = parseInt(reviewCount, 16)
      for (let index = 1; index <= reviewCountInt; index++) {
        const review = await this.reviewData.methods?.reviews(this.fileId, index).call()
        if (review?.id != 0) {
          this.reviews = [...this.reviews, review]
        }
      }
    })
  }

  toggleDarkMode() {
    this._store.dispatch(mode())
  }

  onRatingSet(rating: number): void {
    this.ratingValue = rating
  }

  setFileData() {
    this._fileService.getFileData().then(async (data: any) => {
      this.getAverageRating(this.fileId).then(async (averageRating) => {
        this.file = this.formatFileData({
          ...(await data.methods.files(this.fileId).call()),
          averageRating,
        })
      })
    })
  }

  getIpfsUri() {
    return `https://${this.file?.hash}.ipfs.w3s.link/${this.file?.fileName}`
  }

  contentLoaded() {
    this.isLoading = false
  }

  decodeData(data?: string) {
    return data ? window.atob(data) : ''
  }

  createReview() {
    this._reviewService
      .createReview(this.fileId, this.ngReviewTextModel, this.ratingValue?.toString())
      .then(() => {
        this._firestoreService
          .updateReview({
            id: this.fileId,
            review: this.ngReviewTextModel,
            rating: this.ratingValue?.toString(),
            createdAt: new Date().toISOString(),
            owner: this.walletAddress,
          })
          .then(() => {
            this.ngReviewTextModel = ''
            this.ratingValue = 0
            location.reload()
          })
      })
  }

  private formatFileData(file: FileContractWrapper) {
    return {
      id: file.id,
      hash: file.hash,
      title: file.title,
      authors: file.authors,
      keywords: file.keywords,
      description: file.description,
      tipAmount: file.tipAmount,
      createdAt: file.createdAt,
      owner: file.owner,
      averageRating: file.averageRating,
    } as FileContractWrapper
  }

  async getWalletAddress() {
    this.walletAddress = await this._authService.getWalletAddress()
  }

  isOwner() {
    if (!this.file.id) return of(false)
    return of(this.file?.owner.toString() === this.walletAddress)
  }

  async getAverageRating(fileId: number) {
    const data = await this._firestoreService.getAverageReviewScore(fileId)
    return data
  }
}
