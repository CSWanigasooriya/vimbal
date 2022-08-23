/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Injectable } from '@angular/core'
import { ChainData, Payment } from '@vimbal/model'
import File from 'fileContract'
import { AuthService } from './auth.service'
import { GANACHE_URL } from './models/tokens'

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(
    @Inject(GANACHE_URL) private ganacheUrl: string,
    private _authService: AuthService
  ) {}

  async getFileData(): Promise<Partial<ChainData>> {
    const web3 = window?.web3
    const networkId = await web3?.eth?.net?.getId()
    const networkData = File?.networks[5777 || networkId]
    return web3 ? new web3.eth.Contract(File?.abi, networkData?.address) : null
  }

  async tipAuthor(id?: string, tipAmount?: any): Promise<Payment> {
    const account = await this._authService.getWalletAddress()
    const vimbalContract = await this.getFileData()
    const payment = vimbalContract.methods.tipFileOwner(id).send({
      from: account,
      value: tipAmount,
    })

    return payment as Payment
  }
}
