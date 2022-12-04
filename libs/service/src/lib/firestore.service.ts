import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore'
import { Chat, FileContract, ReviewContract, UserContract } from '@vimbal/model'

import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private usersCollection: AngularFirestoreCollection<Partial<UserContract>>
  private filesCollection: AngularFirestoreCollection<Partial<FileContract>>
  private reviewsCollection: AngularFirestoreCollection<Partial<ReviewContract>>
  private chatNotificationCollection: AngularFirestoreCollection<Partial<Chat>>

  constructor(private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection<Partial<UserContract>>('users')
    this.filesCollection = this.afs.collection<Partial<FileContract>>('files')
    this.reviewsCollection = this.afs.collection<Partial<ReviewContract>>('reviews')
    this.chatNotificationCollection = this.afs.collection<Partial<Chat>>('notifications')
  }

  getUsers(): Observable<Partial<UserContract>[]> {
    return this.usersCollection.valueChanges()
  }

  async updateUser(user: Partial<UserContract>) {
    return await this.usersCollection.doc(user.walletAddress).set(user, { merge: true })
  }

  getFiles() {
    return this.filesCollection.valueChanges()
  }

  async updateNotification(chat: Chat) {
    return await this.chatNotificationCollection
      .doc(chat.chatId)
      .set(chat, { merge: true })
  }

  async getNotifications(receiver: string) {
    const notifications = await this.chatNotificationCollection.ref
      .where('receiver', '==', receiver)
      .get()
    return notifications.docs.map((doc) => doc.data())
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
