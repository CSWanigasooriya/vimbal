import { ChainData, FileContract } from '@vimbal/model'

import { BehaviorSubject } from 'rxjs'
import { ChainService } from './chain.service'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core'
import { NotificationService } from './notification.service'
import { Web3StorageService } from './web3-storage.service'
import { create } from 'ipfs-http-client'

@Injectable({
  providedIn: 'root',
})
export class IpfsService {
  private ipfsReceipt: BehaviorSubject<string> = new BehaviorSubject('')

  chainData!: ChainData
  // connect to the default API address http://localhost:5001
  client = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

  constructor(
    private _chainService: ChainService,
    private _web3StorageService: Web3StorageService,
    private _notificationService: NotificationService
  ) {
    this._chainService.getBlockchainData().then((data: any) => {
      this.chainData = data
    })
  }

  async uploadFile(files: FileList | null, file: FileContract) {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    console.log('Uploading file to ipfs...')
    await this._web3StorageService
      .storeFiles(files)
      .then(async (hash) => {
        const isFileOwned = await this.chainData.methods.isFileOwned().call()
        if (hash && !isFileOwned) {
          await this.chainData.methods
            ?.uploadFile(
              hash,
              file.fileName,
              file.title,
              file.authors,
              file.keywords,
              file.description,
              file.createdAt
            )
            .send({
              from: accounts[0],
              // value: await window.web3.utils.toWei('0.1', 'Ether'),
              gasPrice: 20000000000,
              gas: 6721975,
            })
            .once('sending', (payload: any) => {
              console.log(payload)
            })
            .once('sent', (payload: any) => {
              console.log(payload)
            })
            .once('transactionHash', (hash: any) => {
              console.log(hash)
              window.location.reload()
            })
            .once('receipt', (receipt: any) => {
              console.log(receipt)
            })
            .on('confirmation', (confNumber: any, receipt: any, latestBlockHash: any) => {
              console.log(confNumber)
              console.log(receipt)
              console.log(latestBlockHash)
            })
            .on('error', (error: any) => console.log(error))
          this.ipfsReceipt.next(hash)
        } else {
          this._notificationService.showNotification(
            'File already owned by another author'
          )
        }
      })
      .catch((err) => {
        console.log(err)
      })

    return this.ipfsReceipt.value
  }
}
