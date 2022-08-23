import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private _snackBar: MatSnackBar) {}

  public showNotification(
    message: string = '',
    action: string = 'OK',
    duration: number = 3000
  ): void {
    this._snackBar.open(message, action, {
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    })
  }
}
