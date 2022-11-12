import {
  AfterViewChecked,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Optional,
  ViewChild,
} from '@angular/core'
import { AuthService, ChatService, FirestoreService } from '@vimbal/service'

import { ActivatedRoute } from '@angular/router'
import { Chat } from '@vimbal/model'
import { FormControl } from '@angular/forms'
import { Location } from '@angular/common'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { mode } from '../core/state/theme/theme.actions'
import { AppConfig, APP_CONFIG } from '../core/config/app.config'

@Component({
  selector: 'vimbal-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scroller') private scrollContainer!: ElementRef

  notifications: Partial<Chat>[] = []
  theme$: Observable<boolean>
  messageContent = new FormControl('')
  messages: Chat[] = []
  currentUser = this.chatService.getCurrentUser()
  walletAddress = this._authServie.getWalletAddress()
  chatId = ''

  constructor(
    @Optional() @Inject(APP_CONFIG) public config: AppConfig,
    public location: Location,
    private _firestoreService: FirestoreService,
    private _activatedRouter: ActivatedRoute,
    private _authServie: AuthService,
    private _store: Store<{ count: number; theme: boolean; sidebar: boolean }>,
    public chatService: ChatService
  ) {
    this.chatId = String(this._activatedRouter.snapshot.paramMap.get('id'))
    this.theme$ = _store.select('theme')
  }

  async ngOnInit() {
    this.scrollToBottom()
    this.walletAddress.then((address) => {
      this.chatService.getChats(`${this.chatId}`).on((chats) => {
        this.messages.push(chats as Chat)
        this._firestoreService.getNotifications(address).then((notification) => {
          this.notifications = notification
        })
      })
      this.messages.sort((a: Chat, b: Chat) => a.timestamp.localeCompare(b.timestamp))
    })
  }

  ngAfterViewChecked() {
    this.scrollToBottom()
  }

  sendMessage = (sender: string) => {
    const chat = {
      chatId: this.chatId,
      avatar: 'https://i.pravatar.cc/300',
      content: this.messageContent.value || '',
      sender: sender ? sender : 'Anonymous',
      receiver: this.chatId.split('-')[1],
      timestamp: Date().substring(16, 21),
    }
    this.messageContent.setValue('')
    this._firestoreService.updateNotification(chat)
    this.chatService.sendMessage(chat)
  }

  scrollToBottom(): void {
    try {
      if (this.scrollContainer)
        this.scrollContainer.nativeElement.scrollTop =
          this.scrollContainer?.nativeElement.scrollHeight
    } catch (err) {
      console.log(err)
    }
  }

  toggleDarkMode() {
    this._store.dispatch(mode())
  }
}
