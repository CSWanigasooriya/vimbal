import { AuthService, FileService, FirestoreService } from '@vimbal/service'
import { Component, Input, OnInit } from '@angular/core'

import { FileContract } from '@vimbal/model'
import { of } from 'rxjs'

@Component({
  selector: 'vimbal-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  @Input() fileData: FileContract
  formatedFileData!: Partial<FileContract>
  walletAddress!: string
  isLoading = true
  constructor(
    private _authService: AuthService,
    private _fileService: FileService,
    private _firestoreService: FirestoreService
  ) {
    this.fileData = {} as FileContract
  }

  async ngOnInit(): Promise<void> {
    const fileData: FileContract = {
      id: this.fileData.id,
      hash: this.fileData.hash,
      fileName: this.fileData.fileName,
      title: this.fileData.title,
      description: this.fileData.description,
      authors: this.fileData.authors,
      keywords: this.fileData.keywords,
      owner: this.fileData.owner,
      tipAmount: this.fileData.tipAmount,
      createdAt: this.fileData.createdAt,
      isPublic: this.fileData.isPublic,
    }

    this.formatedFileData = fileData
    this.walletAddress = await this._authService.getWalletAddress()
  }

  async tipAuthor(id?: number) {
    const tipAmount = await window.web3.utils.toWei('0.1', 'Ether')
    this._fileService.tipAuthor(id?.toString(), tipAmount).then((payment) => {
      console.log('payment', payment)
      window.location.reload()
    })
  }

  getTipAmount(tip?: number) {
    return window.web3.utils.fromWei(
      tip?.toLocaleString('fullwide', { useGrouping: false }),
      'ether'
    )
  }

  decodeData(data?: string) {
    return data ? window.atob(data).toString() : ''
  }

  isOwner() {
    return of(this.fileData?.owner.toString() === this.walletAddress)
  }

  getIpfsUri() {
    return `https://${this.fileData?.hash}.ipfs.w3s.link/${this.fileData?.fileName}`
  }

  contentLoaded() {
    this.isLoading = false
  }
}
