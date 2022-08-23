import { Injectable } from '@angular/core'
import { UserContract } from '@vimbal/model'
import User from 'userContract'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  async getUserContract() {
    const web3 = window?.web3
    const networkId = await web3?.eth?.net?.getId()
    const networkData = User?.networks[5777 || networkId]
    return web3 ? new web3.eth.Contract(User?.abi, networkData?.address) : null
  }

  async createUser(user: Partial<UserContract>) {
    const accounts = await window.web3.eth.getAccounts()
    await this.getUserContract().then(async (review) => {
      await review.methods
        ?.createUser(accounts[0], user.displayName, user.role, new Date().toString())
        .send({ from: accounts[0] })
      // .on('transactionHash', (hash: any) => {
      //   this.ipfsReceipt.next(response);
      // });
    })
  }
}
