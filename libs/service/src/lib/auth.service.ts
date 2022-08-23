import { Inject, Injectable, NgZone } from '@angular/core'
import MetaMaskOnboarding from '@metamask/onboarding'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestArguments } from '@vimbal/model'
import { LoggerService } from './logger.service'
import { GANACHE_URL } from './models/tokens'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  forwarderOrigin = 'http://localhost:4200'
  onboarding = new MetaMaskOnboarding({
    // forwarderOrigin: this.forwarderOrigin,
  })

  constructor(
    @Inject(GANACHE_URL) private ganacheUrl: string,
    private _ngZone: NgZone,
    private _loggerService: LoggerService
  ) {}

  isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window
    return Boolean(ethereum && ethereum.isMetaMask)
  }

  metaMaskStartOnBoarding(): void {
    this._ngZone.runOutsideAngular(() => {
      this._ngZone.run(() => {
        this.onboarding.startOnboarding()
      })
    })
  }

  //get wallet address
  async getWalletAddress(): Promise<string> {
    const { web3 } = window
    const accounts = await web3.eth.getAccounts()
    return accounts[0]
  }

  async requestWalletPermission() {
    try {
      await window?.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [
          {
            eth_accounts: {},
          },
        ],
      } as RequestArguments)
    } catch (error: any) {
      if (error.code === 4001) {
        // userRejectedRequest error
        this._loggerService.logInfo('Please connect your wallet.')
      } else {
        this._loggerService.logError(error.message)
      }
    }
  }

  async getWalletBalance() {
    const { web3 } = window
    const accounts = await web3.eth.getAccounts()
    const balance = await web3.eth.getBalance(accounts[0])
    return balance
  }
}
