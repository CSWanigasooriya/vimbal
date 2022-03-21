import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, Inject, OnDestroy, Optional } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { fadeInAnimation } from './core/animation/fade-in.animation';
import { AppConfig, APP_CONFIG } from './core/config/app.config';
import {
  decrement,
  increment,
  reset,
} from './core/state/counter/counter.actions';

@Component({
  selector: 'vimbal-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  animations: [fadeInAnimation],
})
export class RootComponent implements OnDestroy {
  count$: Observable<number>;
  theme$: Observable<boolean>;

  private subscriptions = new Subscription();

  constructor(
    private _iconRegistry: MatIconRegistry,
    private _overlayContainer: OverlayContainer,
    private store: Store<{ count: number; theme: boolean }>,
    @Optional() @Inject(APP_CONFIG) config: AppConfig,
    private _titleService: Title
  ) {
    this.count$ = store.select('count');
    this.theme$ = store.select('theme');

    this._iconRegistry.setDefaultFontSetClass('material-icons-outlined');
    this._overlayContainer.getContainerElement().classList.add('dark-theme');
    this._titleService.setTitle(
      `${config?.title} | Decentralized publications`
    );

    this.subscriptions.add(
      this.theme$.subscribe((theme) => {
        if (theme) {
          this._overlayContainer
            .getContainerElement()
            .classList.add('dark-theme');
        } else {
          this._overlayContainer
            .getContainerElement()
            .classList.remove('dark-theme');
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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

  prepareRoute(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
