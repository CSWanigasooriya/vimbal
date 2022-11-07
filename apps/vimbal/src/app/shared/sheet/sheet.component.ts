import { AuthService, GunService } from '@vimbal/service'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, OnInit } from '@angular/core'
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet'

@Component({
  selector: 'vimbal-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss'],
})
export class SheetComponent implements OnInit {
  walletAddress!: string

  constructor(
    private _authService: AuthService,
    private _bottomSheetRef: MatBottomSheetRef<SheetComponent>,
    private _gunService: GunService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this._authService.getWalletAddress().then((address: string) => {
      this.walletAddress = address
    })

    this._gunService
      .getChat()
      .map()
      .once(async (data, id) => {
        console.log(data)
        console.log(id)
      })
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss()
    event.preventDefault()
  }
}
