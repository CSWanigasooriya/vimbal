import { MediaMatcher } from '@angular/cdk/layout'
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
} from '@angular/core'
import { FormControl } from '@angular/forms'
import { MatBottomSheet } from '@angular/material/bottom-sheet'
import { MatDialog } from '@angular/material/dialog'
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { DialogData, FileContract } from '@vimbal/model'
import { FileService } from '@vimbal/service'
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  startWith,
  Subscription,
} from 'rxjs'
import { SubmitComponent } from '../base/components/submit/submit.component'
import {
  sideNavAnimation,
  sideNavContainerAnimation,
} from '../core/animation/side-bar.animations'
import { mode } from '../core/state/theme/theme.actions'
import { AppConfig, APP_CONFIG } from './../core/config/app.config'
import { SheetComponent } from './../shared/sheet/sheet.component'

@Component({
  selector: 'vimbal-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [sideNavAnimation, sideNavContainerAnimation],
})
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscriptions = new Subscription()

  @ViewChild('snav') snav: MatSidenav | undefined
  @ViewChild(MatSidenavContainer) sidenavContainer: MatSidenavContainer | undefined
  searchControl = new FormControl()
  isCompact = false
  isPinned = false
  theme$: Observable<boolean>
  sidebar$: Observable<boolean>
  filteredOptions!: Observable<FileContract[]>
  files: FileContract[] = []

  mobileQuery: MediaQueryList

  private _mobileQueryListener: () => void

  constructor(
    public dialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
    private _chainService: FileService,
    private router: Router,
    private store: Store<{ count: number; theme: boolean; sidebar: boolean }>,
    @Optional() @Inject(APP_CONFIG) public config: AppConfig,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.theme$ = store.select('theme')
    this.sidebar$ = store.select('sidebar')
    this.mobileQuery = media.matchMedia('(max-width: 600px)')
    this._mobileQueryListener = () => changeDetectorRef.detectChanges()
    this.mobileQuery.addEventListener('change', this._mobileQueryListener)
    this._chainService.getFileData().then(async (data) => {
      const fileCount = await data?.methods?.fileCount().call()
      const fileCountInt = parseInt(fileCount, 16)
      for (let index = 1; index <= fileCountInt; index++) {
        const file = await data.methods?.files(index).call()
        this.files = [...this.files, file].sort((a, b) => b.tipAmount - a.tipAmount)
      }
    })
  }

  ngOnInit(): void {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(100),
      startWith(''),
      map((state) => (state ? this._filter(state) : this.files?.slice()))
    )
  }

  ngAfterViewInit(): void {
    this.subscriptions.add(
      this.sidenavContainer?.scrollable.elementScrolled().subscribe(() => {
        console.log('scrolled')
      })
    )
  }

  ngOnDestroy(): void {
    this.mobileQuery.addEventListener('change', this._mobileQueryListener)
    this.subscriptions.unsubscribe()
  }

  private _filter(value: string): FileContract[] {
    const filterValue = value.toLowerCase()
    return this.files?.filter((state) => state.title.toLowerCase().includes(filterValue))
  }

  onSelectionChanged(event: { option: { id: unknown; value: unknown } }) {
    const selectedValue = event.option.id
    this.router.navigate(['/preview', selectedValue])
  }

  toggleSidebar() {
    this.snav?.toggle()
    this.isCompact = true
    this.isPinned = false
  }

  toggleDarkMode() {
    this.store.dispatch(mode())
  }

  toggleSidebarAnimation(): string {
    return this.isCompact ? 'closed' : 'open'
  }

  decodeData(data?: string) {
    return data ? window.atob(data).toString() : ''
  }

  openBottomSheet() {
    const bottomSheetRef = this._bottomSheet.open(SheetComponent, {
      data: {
        names: ['One', 'Two', 'Three'],
      },
    })
    this.subscriptions.add(
      bottomSheetRef.afterDismissed().subscribe((result) => {
        console.log(result)
      })
    )
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SubmitComponent, {
      // panelClass: ['md:w-4/5', 'w-5/6'],
      maxHeight: '90vh',
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
    })

    this.subscriptions.add(
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          // window.location.reload();
        }
      })
    )
  }
}
