import { Component, Input, OnInit } from '@angular/core'
import { FileContract, FileContractWrapper } from '@vimbal/model'
import { AuthService, FileService, FirestoreService } from '@vimbal/service'
import { of } from 'rxjs'

@Component({
  selector: 'vimbal-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  private _fileData!: FileContract

  @Input() set fileData(data: FileContract) {
    this._fileData = data

    this.getAverageRating(Number(data.id)).then(async (score) => {
      this.formatedFileData = this.formatFileData({
        ...data,
        averageRating: score,
      })
    })
  }

  formatedFileData!: FileContractWrapper
  walletAddress!: string
  isLoading = true

  constructor(
    private _authService: AuthService,
    private _firestoreService: FirestoreService,
    private _chainService: FileService
  ) {}

  ngOnInit(): void {
    this.getWalletAddress()
  }

  private formatFileData(data: FileContractWrapper) {
    return {
      id: data.id,
      hash: data.hash,
      fileName: data.fileName,
      title: data.title,
      description: data.description,
      authors: data.authors,
      keywords: data.keywords,
      owner: data.owner,
      tipAmount: data.tipAmount,
      createdAt: data.createdAt,
      averageRating: data.averageRating,
    } as FileContractWrapper
  }

  async tipAuthor(id?: number) {
    const tipAmount = await window.web3.utils.toWei('0.1', 'Ether')
    this._chainService.tipAuthor(id?.toString(), tipAmount).then((payment) => {
      console.log('payment', payment)
      window.location.reload()
    })
  }

  getTipAmount(tip?: number) {
    if (!tip) return 0
    return window.web3.utils.fromWei(
      tip?.toLocaleString('fullwide', { useGrouping: false }),
      'ether'
    )
  }

  decodeData(data?: string) {
    return data ? window.atob(data).toString() : ''
  }

  isOwner() {
    return of(this._fileData?.owner.toString() === this.walletAddress)
  }

  getIpfsUri() {
    return `https://${this._fileData?.hash}.ipfs.w3s.link/${this._fileData?.fileName}`
  }

  contentLoaded() {
    this.isLoading = false
  }

  async getAverageRating(fileId: number) {
    const data = await this._firestoreService.getAverageReviewScore(fileId)
    return data
  }

  async getWalletAddress() {
    this.walletAddress = await this._authService.getWalletAddress()
  }
}
