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
    this._logger.logInfo('Vimbal initialized');
    this._logger.logDebug('Vimbal initialized');
    this._logger.logError('Vimbal initialized');
    this._logger.logObject({ 'Vimbal initialized': 'Vimbal initialized' });
    this._titleService.setTitle(
      `${config?.title} | Decentralized publications`
    );
  }
}
