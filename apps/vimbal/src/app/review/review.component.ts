import { ChainData, FileContract, ReviewContract } from '@vimbal/model'
import { AuthService, FileService, ReviewService } from '@vimbal/service'
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

import { ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'

@Component({
  selector: 'vimbal-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit, OnDestroy {
  fileId!: number
  file!: FileContract
  isLoading = true
  symKeyId!: string
  reviewData!: ChainData
  reviews: ReviewContract[] = []
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
    private router: Router,
    private store: Store<{ count: number; theme: boolean; sidebar: boolean }>,
    @Optional() @Inject(APP_CONFIG) public config: AppConfig,
    media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef,
    private _route: ActivatedRoute,
    private _fileService: FileService,
    private _reviewService: ReviewService,
    private _authService: AuthService
  ) {
    this.fileId = Number(this._route.snapshot.paramMap.get('id'))
    this.theme$ = store.select('theme')
    this.mobileQuery = media.matchMedia('(max-width: 600px)')
    this._mobileQueryListener = () => changeDetectorRef.detectChanges()
    this.mobileQuery.addEventListener('change', this._mobileQueryListener)
    this._reviewService.getReviewContract().then(async (data: any) => {
      if (data) this.isLoading = false
      this.reviewData = data
      const reviewCount = await this.reviewData?.methods?.reviewCount().call()
      const fileCountInt = parseInt(reviewCount, 16)
      for (let index = 1; index <= fileCountInt; index++) {
        const review = await this.reviewData.methods?.reviews(this.fileId, index).call()
        if (review?.id != 0) this.reviews = [...this.reviews, review]
      }
    })
  }

  async ngOnInit() {
    this.getFile()
    // this._reviewService.createReview(this.fileId, 'test');
    this._reviewService.deleteReview(this.fileId, 1)

    this.walletAddress = await this._authService.getWalletAddress()
  }

  ngOnDestroy(): void {
    this.mobileQuery.addEventListener('change', this._mobileQueryListener)
    this.subscriptions.unsubscribe()
  }

  private _filter(value: string): FileContract[] {
    const filterValue = value.toLowerCase()
    return this.files?.filter((state) => state.title.toLowerCase().includes(filterValue))
  }

  onSelectionChanged(event: { option: { id: unknown; value: unknown } }) {
    const selectedValue = event.option.id
    this.router.navigate(['/preview', selectedValue])
  }

  toggleDarkMode() {
    this.store.dispatch(mode())
  }

  onRatingSet(rating: number): void {
    this.ratingValue = rating
  }

  getFile() {
    this._fileService.getFileData().then(async (data: any) => {
      this.file = await data.methods.files(this.fileId).call()
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
        window.location.reload()
      })
  }

  isOwner() {
    return of(this.file?.owner.toString() === this.walletAddress)
  }
}
