import { AuthService, FileService, ReviewService } from '@vimbal/service'
import { Component, OnInit } from '@angular/core'
import { FileContract, ReviewContract } from '@vimbal/model'

@Component({
  selector: 'vimbal-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  walletAddress!: string
  walletBalance!: string
  userPublications: FileContract[] = []
  userReviews: ReviewContract[] = []

  constructor(
    private _authService: AuthService,
    private _fileService: FileService,
    private _reviewService: ReviewService
  ) {
    this._fileService.getFileData().then(async (data) => {
      const fileCount = await data?.methods?.fileCount().call()
      const fileCountInt = parseInt(fileCount, 16)
      for (let index = 1; index <= fileCountInt; index++) {
        const file = await data.methods?.filesByOwner(this.walletAddress, index).call()
        if (file?.id != 0)
          this.userPublications = [...this.userPublications, file].sort(
            (a, b) => b.tipAmount - a.tipAmount
          )
      }
    })

    this._reviewService.getReviewContract().then(async (data) => {
      const reviewCount = await data?.methods?.reviewCount().call()
      const reviewCountInt = parseInt(reviewCount, 16)
      for (let index = 1; index <= reviewCountInt; index++) {
        const review = await data.methods
          ?.reviewsByOwner(this.walletAddress, index)
          .call()
        this.userReviews = [...this.userReviews, review]
      }
    })
  }

  async ngOnInit() {
    this.walletAddress = await this._authService.getWalletAddress()
    this.walletBalance = await this._authService.getWalletBalance()
  }
}
