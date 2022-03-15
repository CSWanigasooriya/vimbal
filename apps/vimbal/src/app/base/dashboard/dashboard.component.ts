import { Component } from '@angular/core';
import { StorageService } from '@vimbal/service';
@Component({
  selector: 'vimbal-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public accounts = this._storageService.get('accounts');

  constructor(private _storageService: StorageService) {}
}
