import { MediaMatcher } from '@angular/cdk/layout';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
} from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { toggle } from '../core/state/sidebar/sidebar.actions';
import { mode } from '../core/state/theme/theme.actions';
import { AppConfig, APP_CONFIG } from './../core/config/app.config';
import { SheetComponent } from './../shared/sheet/sheet.component';

@Component({
  selector: 'vimbal-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscriptions = new Subscription();

  @ViewChild('snav') snav: MatSidenav | undefined;
  @ViewChild(MatSidenavContainer) sidenavContainer:
    | MatSidenavContainer
    | undefined;

  isCompact = false;
  theme$: Observable<boolean>;
  sidebar$: Observable<boolean>;

  mobileQuery: MediaQueryList;

  fillerNav = Array.from({ length: 12 }, (_, i) => `Nav Item ${i + 1}`);

  private _mobileQueryListener: () => void;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private store: Store<{ count: number; theme: boolean; sidebar: boolean }>,
    @Optional() @Inject(APP_CONFIG) public config: AppConfig,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.theme$ = store.select('theme');
    this.sidebar$ = store.select('sidebar');
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    console.log();
  }

  ngAfterViewInit(): void {
    this.subscriptions.add(
      this.sidenavContainer?.scrollable.elementScrolled().subscribe(() => {
        console.log('scrolled');
      })
    );
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.subscriptions.unsubscribe();
  }

  toggleSidebar() {
    // this.snav?.toggle();
    this.isCompact = !this.isCompact;
    // this.store.dispatch(toggle());
  }

  toggleDarkMode() {
    this.store.dispatch(mode());
  }

  openBottomSheet() {
    const bottomSheetRef = this._bottomSheet.open(SheetComponent, {
      data: {
        names: ['One', 'Two', 'Three'],
      },
    });
  }
}
