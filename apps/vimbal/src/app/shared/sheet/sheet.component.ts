import { AuthService } from '@vimbal/service';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';

@Component({
  selector: 'vimbal-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss'],
})
export class SheetComponent implements OnInit {
  walletAddress!: string;

  constructor(
    private _authService: AuthService,
    private _bottomSheetRef: MatBottomSheetRef<SheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this._authService.getWalletAddress().then((address: string) => {
      this.walletAddress = address;
    });
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
