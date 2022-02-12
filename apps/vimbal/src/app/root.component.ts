import { Component, Inject } from '@angular/core';
import { AppConfig, APP_CONFIG } from '../config/app.config';

@Component({
  selector: 'vimbal-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent {
  title: string;
  constructor(@Inject(APP_CONFIG) config: AppConfig) {
    this.title = config.title;
  }
}
