import { SheetComponent } from './../shared/sheet/sheet.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { APP_CONFIG, AppConfig } from './../../config/app.config';
import { MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  Optional,
} from '@angular/core';
import { mode } from '../state/theme/theme.actions';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'vimbal-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnDestroy {
  theme$: Observable<boolean>;

  mobileQuery: MediaQueryList;

  fillerNav = Array.from({ length: 12 }, (_, i) => `Nav Item ${i + 1}`);

  private _mobileQueryListener: () => void;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private store: Store<{ count: number; theme: boolean }>,
    @Optional() @Inject(APP_CONFIG) public config: AppConfig,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.theme$ = store.select('theme');
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
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
