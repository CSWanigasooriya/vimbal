import { MediaMatcher } from '@angular/cdk/layout'
import { ChangeDetectorRef, Component, Inject, OnDestroy, Optional } from '@angular/core'
import { FormControl } from '@angular/forms'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { FileContract } from '@vimbal/model'
import { FileService } from '@vimbal/service'
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  startWith,
  Subscription,
} from 'rxjs'
import { AppConfig, APP_CONFIG } from '../core/config/app.config'
import { mode } from '../core/state/theme/theme.actions'
import { Location } from '@angular/common'

@Component({
  selector: 'vimbal-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
})
export class BrowseComponent implements OnDestroy {
  private subscriptions = new Subscription()

  mobileQuery: MediaQueryList
  theme$: Observable<boolean>
  searchControl = new FormControl('')
  allFilteredFiles!: Observable<FileContract[]>
  filteredTrendingFiles!: Observable<FileContract[]>
  allFiles: FileContract[] = []
  trendingFiles: FileContract[] = []

  private _mobileQueryListener: () => void

  constructor(
    public location: Location,
    private _router: Router,
    private _store: Store<{ count: number; theme: boolean; sidebar: boolean }>,
    @Optional() @Inject(APP_CONFIG) public config: AppConfig,
    media: MediaMatcher,
    private _fileService: FileService,
    changeDetectorRef: ChangeDetectorRef
  ) {
    this.theme$ = _store.select('theme')
    this.mobileQuery = media.matchMedia('(max-width: 600px)')
    this._mobileQueryListener = () => changeDetectorRef.detectChanges()
    this.mobileQuery.addEventListener('change', this._mobileQueryListener)
    this._fileService.getFileData().then(async (data) => {
      const fileCount = await data?.methods?.fileCount().call()
      const fileCountInt = parseInt(fileCount, 16)
      for (let index = 1; index <= fileCountInt; index++) {
        const file = await data.methods?.files(index).call()
        this.allFiles = [...this.allFiles, file].sort((a, b) => b.tipAmount - a.tipAmount)
        this.trendingFiles = [...this.trendingFiles, file].filter(
          (file) => file.tipAmount > 0
        )
        this.filteredTrendingFiles = this.searchControl.valueChanges.pipe(
          startWith(''),
          distinctUntilChanged(),
          debounceTime(100),
          startWith(''),
          map((value) => this._filterTrendingFiles(value || ''))
        )
        this.allFilteredFiles = this.searchControl.valueChanges.pipe(
          distinctUntilChanged(),
          debounceTime(100),
          startWith(''),
          map((state) => this._filterAllFiles(state || ''))
        )
      }
    })
  }

  ngOnDestroy(): void {
    this.mobileQuery.addEventListener('change', this._mobileQueryListener)
    this.subscriptions.unsubscribe()
  }

  private _filterAllFiles(value: string): FileContract[] {
    const filterValue = value.toLowerCase()
    return this.allFiles?.filter((state) =>
      state.title.toLowerCase().includes(filterValue)
    )
  }

  private _filterTrendingFiles(value: string): FileContract[] {
    const filterValue = value.toLowerCase()
    return this.trendingFiles?.filter((state) =>
      state.title.toLowerCase().includes(filterValue)
    )
  }

  sortByTitle() {
    this.allFilteredFiles = this.allFilteredFiles.pipe(
      map((files) => files.sort((a, b) => a.title.localeCompare(b.title)))
    )
    this.filteredTrendingFiles = this.filteredTrendingFiles.pipe(
      map((files) => files.sort((a, b) => a.title.localeCompare(b.title)))
    )
  }

  sortByTipAmount() {
    this.allFilteredFiles = this.allFilteredFiles.pipe(
      map((files) => files.sort((a, b) => b.tipAmount - a.tipAmount))
    )
    this.filteredTrendingFiles = this.filteredTrendingFiles.pipe(
      map((files) => files.sort((a, b) => b.tipAmount - a.tipAmount))
    )
  }

  onSelectionChanged(event: { option: { id: unknown; value: unknown } }) {
    const selectedValue = event.option.id
    this._router.navigate(['/review', selectedValue])
  }

  toggleDarkMode() {
    this._store.dispatch(mode())
  }

  decodeData(data?: string) {
    return data ? window.atob(data).toString() : ''
  }
}
