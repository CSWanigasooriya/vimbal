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
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { DialogData } from '@vimbal/model';
import { Observable, Subscription } from 'rxjs';
import { SubmitComponent } from '../base/components/submit/submit.component';
import {
  sideNavAnimation,
  sideNavContainerAnimation,
} from '../core/animation/side-bar.animations';
import { toggle } from '../core/state/sidebar/sidebar.actions';
import { mode } from '../core/state/theme/theme.actions';
import { AppConfig, APP_CONFIG } from './../core/config/app.config';
import { SheetComponent } from './../shared/sheet/sheet.component';

@Component({
  selector: 'vimbal-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [sideNavAnimation, sideNavContainerAnimation],
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

  private _mobileQueryListener: () => void;

  constructor(
    public dialog: MatDialog,
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
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
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
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
    this.subscriptions.unsubscribe();
  }

  toggleSidebar() {
    // this.snav?.toggle();
    this.store.dispatch(toggle());
    this.isCompact = true;
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
    this.subscriptions.add(
      bottomSheetRef.afterDismissed().subscribe((result) => {
        console.log(result);
      })
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SubmitComponent, {
      // panelClass: ['md:w-4/5', 'w-5/6'],
      height: '98vh',
      width: '98vw',
      data: {
        title: 'SUBMIT PAPER',
        cancelButton: {
          text: 'CANCEL',
          color: 'primary',
          type: 'mat-stroked-button',
        },
        okayButton: {
          text: 'SUBMIT',
          color: 'primary',
          type: 'mat-raised-button',
        },
      } as DialogData,
    });

    this.subscriptions.add(
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          window.location.reload();
        }
      })
    );
  }
}
