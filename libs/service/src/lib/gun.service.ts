import { BehaviorSubject } from 'rxjs'
import { Chat } from '@vimbal/model'
import Gun from 'gun/gun'
import { ISEAPair } from 'gun/types'
import { Injectable } from '@angular/core'
import SEA from 'gun/sea'

@Injectable({
  providedIn: 'root',
})
export class GunService {
  private currentUser = new BehaviorSubject<{
    type: string
    payload: {
      username: string
      key: string
    }
  } | null>(null)
  // Port 5050 is the port of the gun server
  gun = Gun({
    peers: ['http://localhost:5050/gun'],
  })

  user = this.gun.user()

  getChats = (chatId: string) => this.gun.get(chatId).map()

  getCurrentUser = () => this.currentUser.asObservable()

  sendMessage = (chat: Chat) => {
    // a reference to the current room
    const messagesRef = this.gun.get(chat.chatId || 'default')

    // the message object to be sent/saved
    const messageObject = {
      chatId: chat.chatId,
      sender: chat.sender,
      avatar: chat.avatar,
      content: chat.content,
      receiver: chat.receiver,
      timestamp: Date().substring(16, 21),
      displayName: chat.displayName,
    } as Chat

    // this function sends/saves the message onto the network
    messagesRef.set(messageObject)
  }

  async createChat(payload: { username: string }) {
    const key = await SEA.pair()
    this.authUser({ key: key, username: payload.username })
    this.user.get('chat').get('room').put(payload.username)
  }

  authUser(payload: { key: ISEAPair; username: string }) {
    this.user.auth(payload.key)
    if (this.user.is) {
      this.user
        .get('chat')
        .get('room')
        .on((username) => {
          // Update the username and key in our auth context
          this.currentUser.next({
            type: 'AUTH',
            payload: {
              username: username,
              key: JSON.stringify(this.user.is),
            },
          })
        })
    }
  }
}
