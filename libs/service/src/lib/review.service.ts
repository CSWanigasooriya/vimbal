import { Injectable } from '@angular/core'
import { ReviewContractBuild } from '@vimbal/contract'

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  async getReviewContract() {
    const web3 = window?.web3
    const networkId = await web3?.eth?.net?.getId()
    const networkData = ReviewContractBuild?.networks[5777 || networkId]
    return web3
      ? new web3.eth.Contract(ReviewContractBuild?.abi, networkData?.address)
      : null
  }

  async createReview(fileId: number, content: string, rating: string) {
    const accounts = await window.web3.eth.getAccounts()

    await this.getReviewContract().then(async (review) => {
      await review.methods
        ?.createReview(fileId, content, rating, new Date().toString())
        .send({ from: accounts[0] })
      // .on('transactionHash', (hash: any) => {
      //   this.ipfsReceipt.next(response);
      // });
    })
  }

  async deleteReview(fileId: number, reviewId: number) {
    await this.getReviewContract().then(async (reviews) => {
      await reviews.methods?.deleteReview(fileId, reviewId).call()
    })
  }
}
