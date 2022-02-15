import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Optional,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoggerService } from '@vimbal/service';
import { Observable } from 'rxjs';
import { AppConfig, APP_CONFIG } from '../config/app.config';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from './state/counter.actions';

@Component({
  selector: 'vimbal-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RootComponent {
  count$: Observable<number>;

  constructor(
    private store: Store<{ count: number }>,
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
    this.count$ = store.select('count');
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
