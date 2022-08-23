import { AuthService, FileService, ReviewService, UserService } from '@vimbal/service'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core'
import { FileContract, ReviewContract, UserContract } from '@vimbal/model'
@Component({
  selector: 'vimbal-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isLoading = true
  userWalletAddress!: string
  currentBlockNumber!: number
  reviewsByOwner: ReviewContract[] = []
  filesByOwner: FileContract[] = []
  files: FileContract[] = []
  users: UserContract[] = []
  selectedTabIndex = 0

  constructor(
    private _authService: AuthService,
    private _fileService: FileService,
    private _reviewService: ReviewService,
    private _userService: UserService
  ) {
    this.getWalletAddress()

    this._fileService.getFileData().then(async (data: any) => {
      if (data) this.isLoading = false
      const fileCount = await data?.methods?.fileCount().call()
      const fileCountInt = parseInt(fileCount, 16)
      for (let index = 1; index <= fileCountInt; index++) {
        const file = await data.methods
          ?.filesByOwner(this.userWalletAddress, index)
          .call()
        if (file?.id != 0)
          this.filesByOwner = [...this.filesByOwner, this.formatFileData(file)].sort(
            (a, b) => b.tipAmount - a.tipAmount
          )
      }
    })

    this._reviewService.getReviewContract().then(async (data: any) => {
      if (data) this.isLoading = false
      const reviewCount = await data?.methods?.reviewCount().call()
      const fileCountInt = parseInt(reviewCount, 16)
      for (let index = 1; index <= fileCountInt; index++) {
        const review = await data.methods
          ?.reviewsByOwner(this.userWalletAddress, index)
          .call()
        if (review?.id != 0) this.reviewsByOwner = [...this.reviewsByOwner, review]
      }
    })

    this._userService.getUserContract().then(async (data: any) => {
      if (data) this.isLoading = false
      const userCount = await data?.methods?.userCount().call()
      const userCountInt = parseInt(userCount, 16)
      for (let index = 1; index <= userCountInt; index++) {
        const user = await data.methods?.users(index).call()
        this.users = [...this.users, user]
      }
    })
  }

  ngOnInit(): void {
    window.web3.eth.getAccounts().then((accounts: string | unknown[]) => {
      if (accounts.length === 0) this._authService.requestWalletPermission()
    })
  }

  async getWalletAddress() {
    this.userWalletAddress = await this._authService.getWalletAddress()
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
}
