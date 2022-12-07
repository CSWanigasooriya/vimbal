import {
  AfterViewChecked,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Optional,
  ViewChild,
} from '@angular/core'
import { AuthService, FirestoreService, GunService } from '@vimbal/service'

import { Location } from '@angular/common'
import { FormControl } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { Chat, UserContract } from '@vimbal/model'
import { Observable } from 'rxjs'
import { AppConfig, APP_CONFIG } from '../core/config/app.config'
import { mode } from '../core/state/theme/theme.actions'

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
  currentUser!: Observable<Partial<UserContract> | undefined>
  walletAddress = this.authService.getWalletAddress()
  chatId = ''

  constructor(
    @Optional() @Inject(APP_CONFIG) public config: AppConfig,
    public location: Location,
    private _firestoreService: FirestoreService,
    private _activatedRouter: ActivatedRoute,
    public authService: AuthService,
    private _store: Store<{ count: number; theme: boolean; sidebar: boolean }>,
    public gunService: GunService
  ) {
    this.chatId = String(this._activatedRouter.snapshot.paramMap.get('id'))
    this.theme$ = _store.select('theme')
  }

  async ngOnInit() {
    this.scrollToBottom()
    this.walletAddress.then((address) => {
      this.currentUser = this.authService.getCurrentUser(address)
      this.gunService.getChats(`${this.chatId}`).on((chats) => {
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

  sendMessage = (user: Partial<UserContract>, sender: string) => {
    const chat = {
      chatId: this.chatId,
      avatar: user.photoURL ? user.photoURL : 'https://i.pravatar.cc/300',
      content: this.messageContent.value || '',
      sender: sender ? sender : 'Anonymous',
      receiver: this.chatId.split('-')[1],
      timestamp: Date().substring(16, 21),
      displayName: user?.displayName ? user?.displayName : sender,
    } as Chat
    this.messageContent.setValue('')
    this._firestoreService.updateNotification(chat)
    this.gunService.sendMessage(chat)
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
