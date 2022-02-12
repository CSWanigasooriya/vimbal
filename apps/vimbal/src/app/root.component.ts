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
    private _logger: LoggerService,
    private _titleService: Title
  ) {
    this._logger.logInfo('Vimbal Info');
    this._logger.logDebug('Vimbal Debug');
    this._logger.logError('Vimbal Error');
    this._logger.logObject({ 1: 'Vimbal initialized' });
    this._titleService.setTitle(
      `${config?.title} | Decentralized publications`
    );
  }
}
