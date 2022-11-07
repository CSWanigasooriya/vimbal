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
  filteredOptions!: Observable<FileContract[]>
  files: FileContract[] = []

  private _mobileQueryListener: () => void

  constructor(
    private router: Router,
    private store: Store<{ count: number; theme: boolean; sidebar: boolean }>,
    @Optional() @Inject(APP_CONFIG) public config: AppConfig,
    media: MediaMatcher,
    private _fileService: FileService,
    changeDetectorRef: ChangeDetectorRef
  ) {
    this.theme$ = store.select('theme')
    this.mobileQuery = media.matchMedia('(max-width: 600px)')
    this._mobileQueryListener = () => changeDetectorRef.detectChanges()
    this.mobileQuery.addEventListener('change', this._mobileQueryListener)
    this._fileService.getFileData().then(async (data) => {
      const fileCount = await data?.methods?.fileCount().call()
      const fileCountInt = parseInt(fileCount, 16)
      for (let index = 1; index <= fileCountInt; index++) {
        const file = await data.methods?.files(index).call()
        this.files = [...this.files, file].sort((a, b) => b.tipAmount - a.tipAmount)
        this.filteredOptions = this.searchControl.valueChanges.pipe(
          distinctUntilChanged(),
          debounceTime(100),
          startWith(''),
          map((state) => this._filter(state || ''))
        )
      }
    })
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

  toggleDarkMode() {
    this.store.dispatch(mode())
  }

  decodeData(data?: string) {
    return data ? window.atob(data).toString() : ''
  }
}
