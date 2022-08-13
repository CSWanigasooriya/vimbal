import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, Inject, OnDestroy, Optional, OnInit } from '@angular/core';
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
import Web3 from 'web3';
import { AuthService } from '@vimbal/service';
import { ConnectInfo, ProviderRpcError } from '@vimbal/model';
@Component({
  selector: 'vimbal-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  animations: [fadeInAnimation],
})
export class RootComponent implements OnInit, OnDestroy {
  count$: Observable<number>;
  theme$: Observable<boolean>;

  private subscriptions = new Subscription();

  constructor(
    private _authService: AuthService,
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

  ngOnInit(): void {
    this.loadWeb3();
    window?.ethereum.on('accountsChanged', (accounts: any) => {
      // Handle the new accounts, or lack thereof.
      // "accounts" will always be an array, but it can be empty.
      if (accounts) window.location.reload();
    });
    window?.ethereum.on('chainChanged', (chainId: any) => {
      // Handle the new chain.
      // Correctly handling chain changes can be complicated.
      // We recommend reloading the page unless you have good reason not to.
      if (chainId) window.location.reload();
    });
    window?.ethereum.on('connect', (connectInfo: ConnectInfo) => {
      console.log('connectInfo', connectInfo);
    });
    window?.ethereum.on('disconnect', (error: ProviderRpcError) => {
      console.log('error', error);
    });
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

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.web3.eth.getAccounts().then((accounts: string | unknown[]) => {
        if (accounts.length === 0) this._authService.requestWalletPermission();
      });
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      this._authService.metaMaskStartOnBoarding();
    }
  }
}
