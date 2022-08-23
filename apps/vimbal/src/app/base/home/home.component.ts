/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core'

import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { UserContract } from '@vimbal/model'
import { UserService } from '@vimbal/service'
import { mode } from '../../core/state/theme/theme.actions'

@Component({
  selector: 'vimbal-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  theme$: Observable<boolean>
  users: UserContract[] = []

  constructor(
    private _userService: UserService,
    private store: Store<{ count: number; theme: boolean; sidebar: boolean }>
  ) {
    this.theme$ = store.select('theme')
  }

  ngOnInit(): void {
    this._userService.getUserContract().then(async (data: any): Promise<void> => {
      const userCount = await data?.methods?.userCount().call()
      const userCountInt = parseInt(userCount, 16)
      for (let index = 1; index <= userCountInt; index++) {
        const user = await data.methods?.users(index).call()
        this.users = [...this.users, user]
      }
    })
  }

  toggleDarkMode() {
    this.store.dispatch(mode())
  }

  createUser() {
    this._userService.createUser({
      displayName: 'John Doe',
      email: 'john@gmail.com',
      role: 'admin',
    })
  }
}
