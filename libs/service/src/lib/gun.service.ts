/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core'
import Gun from 'gun/gun'
import { IGunInstance } from 'gun/types'

@Injectable({
  providedIn: 'root',
})
export class GunService {
  db: IGunInstance<any>
  user: any
  constructor() {
    this.db = Gun()
  }

  setChat(chat: any) {
    this.db.get('chat').set(chat)
  }

  getChat() {
    return this.db.get('chat')
  }
}
