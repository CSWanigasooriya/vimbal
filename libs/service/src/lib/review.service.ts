import { Injectable } from '@angular/core'
import Review from 'reviewContract'

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  async getAllReviews() {
    const web3 = window?.web3
    const networkId = await web3?.eth?.net?.getId()
    const networkData = Review?.networks[5777 || networkId]
    return web3 ? new web3.eth.Contract(Review?.abi, networkData?.address) : null
  }

  async createReview(fileId: number, review: string, rating: string) {
    const accounts = await window.web3.eth.getAccounts()

    await this.getAllReviews().then(async (reviews) => {
      await reviews.methods
        ?.createReview(fileId, review, rating, new Date().toString())
        .send({ from: accounts[0] })
      // .on('transactionHash', (hash: any) => {
      //   this.ipfsReceipt.next(response);
      // });
    })
  }

  async deleteReview(fileId: number, reviewId: number) {
    await this.getAllReviews().then(async (reviews) => {
      await reviews.methods?.deleteReview(fileId, reviewId).call()
    })
  }
}
