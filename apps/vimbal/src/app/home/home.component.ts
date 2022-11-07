/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core'

import { Store } from '@ngrx/store'
import { FileContract, UserContract } from '@vimbal/model'
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
  files: FileContract[] = []
  userWalletAddress = ''

  private subscriptions = new Subscription()

  constructor(
    private _reviewService: ReviewService,
    private _authService: AuthService,
    private _fileService: FileService,
    private _firestoreService: FirestoreService,
    private store: Store<{ count: number; theme: boolean; sidebar: boolean }>
  ) {
    this.getWalletAddress()
    this.theme$ = store.select('theme')
  }

  ngOnInit(): void {
    this._fileService.getFileData().then(async (data: any) => {
      const fileCount = await data?.methods?.fileCount().call()
      const fileCountInt = parseInt(fileCount, 16)
      for (let index = 1; index <= fileCountInt; index++) {
        const file = await data.methods?.files(index).call()
        if (file?.id != 0)
          this.files = [...this.files, this.formatFileData(file)].sort(
            (a, b) => b.tipAmount - a.tipAmount
          )
      }
    })

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

  formatFileData(file: FileContract) {
    return {
      id: parseInt(file.id.toString(), 16),
      hash: file.hash,
      title: file.title,
      authors: file.authors,
      keywords: file.keywords,
      description: file.description,
      tipAmount: parseInt(file.tipAmount.toString(), 16),
      createdAt: file.createdAt,
      owner: file.owner,
    } as FileContract
  }

  getAverageRating(file: FileContract): number {
    let reviewCountPerFile = 0
    let totalReviewsPerFile = 0
    this._reviewService.getReviewContract().then(async (data: any) => {
      const reviewCount = await data?.methods?.reviewCount().call()
      const reviewCountInt = parseInt(reviewCount, 16)
      for (let index = 1; index <= reviewCountInt; index++) {
        const review = await data.methods?.reviews(file.id).call()
        if (review?.id != 0) {
          totalReviewsPerFile += 1
          reviewCountPerFile += parseInt(review.rating.toString(), 16)
        }
      }
    })
    return reviewCountPerFile / totalReviewsPerFile
  }
}
