import { Observable, map } from 'rxjs'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FileContract } from '@vimbal/model'
import { ChainService } from '@vimbal/service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'vimbal-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
  isLoading = true
  fileId!: number
  file!: FileContract
  authors: string[] = []
  keywords: string[] = []

  private subscriptions = new Subscription()

  constructor(private _chainService: ChainService, private _route: ActivatedRoute) {
    const id: Observable<string> = _route.params.pipe(map((p) => p['id']))
    id.subscribe((id) => {
      this.fileId = parseInt(id, 10)
      this.getFile()
    })
  }

  ngOnInit(): void {
    this.getFile()
  }

  getFile() {
    this._chainService.getBlockchainData().then(async (data: any) => {
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
    return data ? data.toString() : ''
  }
}
