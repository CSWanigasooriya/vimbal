import { Inject, Injectable } from '@angular/core'
import { Web3Storage } from 'web3.storage'
import { WEB3_STORAGE_TOKEN } from './models/tokens'

@Injectable({
  providedIn: 'root',
})
export class Web3StorageService {
  constructor(@Inject(WEB3_STORAGE_TOKEN) private web3StorageToken: string) {}

  async storeFiles(files: FileList | null) {
    const client = this.makeStorageClient()
    const cid = await client.put(Array.from(files ? files : []))
    console.log('stored files with cid:', cid)
    return cid
  }

  async storeWithProgress(files: FileList | null) {
    // show the root cid as soon as it's ready
    const onRootCidReady = (cid: string) => {
      console.log('uploading files with cid:', cid)
    }

    // when each chunk is stored, update the percentage complete and display
    const totalSize = Array.from(files ? files : [])
      .map((f) => f.size)
      .reduce((a, b) => a + b, 0)
    let uploaded = 0

    const onStoredChunk = (size: number) => {
      uploaded += size
      const pct = 100 * (uploaded / totalSize)
      console.log(`Uploading... ${pct.toFixed(2)}% complete`)
    }

    // makeStorageClient returns an authorized Web3.Storage client instance
    const client = this.makeStorageClient()

    // client.put will invoke our callbacks during the upload
    // and return the root cid when the upload completes
    return client.put(Array.from(files ? files : []), { onRootCidReady, onStoredChunk })
  }

  private getAccessToken(): string {
    return this.web3StorageToken
  }

  makeStorageClient() {
    return new Web3Storage({
      token: this.getAccessToken(),
      endpoint: new URL('https://api.web3.storage'),
    })
  }
}
