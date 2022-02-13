import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'vimbal-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  login(authenticate: unknown) {
    console.log(authenticate);
  }
}
