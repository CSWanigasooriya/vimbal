import { AuthService, FirestoreService, StorageService } from '@vimbal/service'
import { Component, OnInit } from '@angular/core'

import { Chat } from '@vimbal/model'
import { Router } from '@angular/router'

@Component({
  selector: 'vimbal-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  notifications: Partial<Chat>[] = []

  walletAddressPromise = this._authServie.getWalletAddress()
  walletAddress = ''

  constructor(
    private _router: Router,
    private _authServie: AuthService,
    private _firestoreService: FirestoreService,
    private _storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.walletAddressPromise.then((address) => {
      this.walletAddress = address
      this._firestoreService.getNotifications(address).then((notification) => {
        this.notifications = notification
      })
    })
  }

  goToChat = (id?: string) => {
    this._router.navigate([`/chat/${id}`])
  }
}
