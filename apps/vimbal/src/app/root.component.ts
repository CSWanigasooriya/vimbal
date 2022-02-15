import { Component, Inject, Optional } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppConfig, APP_CONFIG } from '../config/app.config';
import { LoggerService } from '../services/logger.service';

@Component({
  selector: 'vimbal-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent {
  constructor(
    @Optional() @Inject(APP_CONFIG) config: AppConfig,
    private _loggerService: LoggerService,
    private _titleService: Title
  ) {
    this._loggerService.logInfo('Vimbal Info');
    this._loggerService.logDebug('Vimbal Debug');
    this._loggerService.logError('Vimbal Error');
    this._loggerService.logObject({ 1: 'Vimbal initialized' });
    this._titleService.setTitle(
      `${config?.title} | Decentralized publications`
    );
  }
}
