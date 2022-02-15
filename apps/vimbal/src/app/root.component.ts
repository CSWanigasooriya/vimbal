import { OverlayContainer } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Optional,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { LoggerService } from '@vimbal/service';
import { Observable } from 'rxjs';
import { AppConfig, APP_CONFIG } from '../config/app.config';
import { decrement, increment, reset } from './state/counter/counter.actions';

@Component({
  selector: 'vimbal-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RootComponent {
  count$: Observable<number>;
  theme$: Observable<boolean>;

  constructor(
    private _overlayContainer: OverlayContainer,
    private store: Store<{ count: number; theme: boolean }>,
    @Optional() @Inject(APP_CONFIG) config: AppConfig,
    private _loggerService: LoggerService,
    private _titleService: Title
  ) {
    this._overlayContainer.getContainerElement().classList.add('dark-theme');
    this._loggerService.logInfo('Vimbal Info');
    this._loggerService.logDebug('Vimbal Debug');
    this._loggerService.logError('Vimbal Error');
    this._loggerService.logObject({ 1: 'Vimbal initialized' });
    this._titleService.setTitle(
      `${config?.title} | Decentralized publications`
    );
    this.count$ = store.select('count');
    this.theme$ = store.select('theme');
    this.count$.subscribe((count) => {
      this._loggerService.logObject({ count });
    });
    this.theme$.subscribe((theme) => {
      this._loggerService.logObject({ theme });
    });

    this.theme$.subscribe((theme) => {
      theme
        ? this._overlayContainer
            .getContainerElement()
            .classList.add('dark-theme')
        : this._overlayContainer
            .getContainerElement()
            .classList.remove('dark-theme');
    });
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }
}
