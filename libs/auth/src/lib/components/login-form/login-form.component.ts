import { Component, EventEmitter, Output } from '@angular/core';
import { Authenticate } from '@vimbal/data-models';

@Component({
  selector: 'vimbal-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Output() dataSubmit = new EventEmitter<Authenticate>();

  login(authenticate: Authenticate) {
    this.dataSubmit.emit(authenticate);
  }
}
