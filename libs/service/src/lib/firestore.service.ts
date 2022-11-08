import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore'
import { FileContract, ReviewContract, UserContract } from '@vimbal/model'

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private usersCollection: AngularFirestoreCollection<UserContract>
  private filesCollection: AngularFirestoreCollection<Partial<FileContract>>
  private reviewsCollection: AngularFirestoreCollection<Partial<ReviewContract>>

  constructor(private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection<UserContract>('users')
    this.filesCollection = this.afs.collection<Partial<FileContract>>('files')
    this.reviewsCollection = this.afs.collection<Partial<ReviewContract>>('reviews')
  }

  getUsers(): Observable<UserContract[]> {
    return this.usersCollection.valueChanges()
  }

  async createUser(user: UserContract) {
    return await this.usersCollection.add(user)
  }

  getFiles() {
    return this.filesCollection.valueChanges()
  }

  getReviews() {
    return this.reviewsCollection.valueChanges()
  }

  async getAverageReviewScore(fileId: number) {
    const reviews = await this.reviewsCollection.ref.where('id', '==', fileId).get()
    const reviewCount = reviews.docs.length
    const reviewScore = reviews.docs.reduce((acc, curr) => {
      return acc + (curr.data().rating ? Number(curr.data().rating) : 0)
    }, 0)
    return reviewScore / reviewCount
  }

  async updateFile(file: Partial<FileContract>) {
    return await this.filesCollection.doc().set(file, { merge: true })
  }

  async updateReview(review: Partial<ReviewContract>) {
    return await this.reviewsCollection.doc().set(review, { merge: true })
  }
}
