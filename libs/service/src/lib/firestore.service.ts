import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore'
import { FileContract, UserContract } from '@vimbal/model'

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private usersCollection: AngularFirestoreCollection<UserContract>
  private filesCollection: AngularFirestoreCollection<FileContract>

  constructor(private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection<UserContract>('users')
    this.filesCollection = this.afs.collection<FileContract>('files')
  }

  getUsers(): Observable<UserContract[]> {
    return this.usersCollection.valueChanges()
  }

  async createUser(user: UserContract) {
    await this.usersCollection.add(user)
  }

  getFiles() {
    return this.filesCollection.valueChanges()
  }

  async createFile(file: FileContract) {
    await this.filesCollection.add(file)
  }
}
