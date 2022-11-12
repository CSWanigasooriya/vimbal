/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core'

import { Store } from '@ngrx/store'
import { FileContractWrapper, ReviewContract, UserContract } from '@vimbal/model'
import {
  AuthService,
  FileService,
  FirestoreService,
  ReviewService,
} from '@vimbal/service'
import { Observable, Subscription } from 'rxjs'
import { mode } from '../core/state/theme/theme.actions'

@Component({
  selector: 'vimbal-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  theme$: Observable<boolean>
  users: UserContract[] = []
  files: FileContractWrapper[] = []
  userWalletAddress = ''
  reviews: ReviewContract[] = []

  private subscriptions = new Subscription()

  constructor(
    private _authService: AuthService,
    private _fileService: FileService,
    private _firestoreService: FirestoreService,
    private _reviewService: ReviewService,
    private store: Store<{ count: number; theme: boolean; sidebar: boolean }>
  ) {
    this.getWalletAddress()
    this.theme$ = store.select('theme')
  }

  ngOnInit(): void {
    this.setFileData()
    this.subscriptions.add(
      this._firestoreService.getUsers().subscribe((users) => {
        this.users = users as UserContract[]
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  async getWalletAddress() {
    this.userWalletAddress = await this._authService.getWalletAddress()
  }

  decodeData(data?: string) {
    return data ? window.atob(data).toString() : ''
  }

  toggleDarkMode() {
    this.store.dispatch(mode())
  }

  private setFileData() {
    this._fileService.getFileData().then(async (data: any) => {
      const fileCount = await data?.methods?.fileCount().call()
      const fileCountInt = parseInt(fileCount, 16)
      for (let fileId = 1; fileId <= fileCountInt; fileId++) {
        const file = await data.methods?.files(fileId).call()
        this._reviewService.getReviewContract().then(async (data: any) => {
          const reviewCount = await data?.methods?.reviewCount().call()
          const fileCountInt = parseInt(reviewCount, 16)
          for (let index = 1; index <= fileCountInt; index++) {
            const review = await data.methods?.reviews(fileId, index).call()
            if (review?.id != 0)
              this.reviews = [...this.reviews, review].sort(
                (a, b) => b.createdAt - a.createdAt
              )
          }
        })
        if (file?.id != 0)
          this.getAverageRating(fileId).then(async (averageRating) => {
            this.files = [
              ...this.files,
              this.formatFileData({ ...file, averageRating }),
            ].sort((a, b) => b.averageRating - a.averageRating)
          })
      }
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
      averageRating: file.averageRating || 0,
    } as FileContractWrapper
  }

  private async getAverageRating(fileId: number) {
    const data = await this._firestoreService.getAverageReviewScore(fileId)
    return data
  }
}
