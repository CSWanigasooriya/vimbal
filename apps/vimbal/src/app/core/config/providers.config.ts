import { APP_CONFIG, VIMBAL_DI_CONFIG } from './app.config'
import { COMMA, ENTER, TAB } from '@angular/cdk/keycodes'
import {
  ErrorStateMatcher,
  MAT_DATE_LOCALE,
  MAT_RIPPLE_GLOBAL_OPTIONS,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core'
import {
  MAT_BOTTOM_SHEET_DATA,
  MAT_BOTTOM_SHEET_DEFAULT_OPTIONS,
  MatBottomSheet,
} from '@angular/material/bottom-sheet'
import {
  MAT_CHECKBOX_DEFAULT_OPTIONS,
  MatCheckboxDefaultOptions,
} from '@angular/material/checkbox'
import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MatTooltipDefaultOptions,
} from '@angular/material/tooltip'
import { ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics'

import { FIREBASE_OPTIONS } from '@angular/fire/compat'
import { GlobalRippleOptionsService } from '@vimbal/service'
import { MAT_AUTOCOMPLETE_DEFAULT_OPTIONS } from '@angular/material/autocomplete'
import { MAT_CHIPS_DEFAULT_OPTIONS } from '@angular/material/chips'
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog'
import { MAT_EXPANSION_PANEL_DEFAULT_OPTIONS } from '@angular/material/expansion'
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field'
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio'
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar'
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper'
import { Title } from '@angular/platform-browser'
import { environment } from '../../../environments/environment'

/** Custom options the configure the tooltip's default show/hide delays. */
export const tooltipOptions: MatTooltipDefaultOptions = {
  showDelay: 100,
  hideDelay: 50,
  touchendHideDelay: 1000,
}

export const PROVIDERS_CONFIG = [
  {
    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    useValue: {
      appearance: 'outline',
    },
  },
  {
    provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS,
    useValue: { hasBackdrop: true },
  },
  {
    provide: MAT_CHECKBOX_DEFAULT_OPTIONS,
    useValue: { clickAction: 'noop' } as MatCheckboxDefaultOptions,
  },
  {
    provide: MAT_CHIPS_DEFAULT_OPTIONS,
    useValue: {
      separatorKeyCodes: [ENTER, COMMA, TAB],
    },
  },
  { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  {
    provide: MAT_DIALOG_DEFAULT_OPTIONS,
    useValue: { panelClass: 'mat-dialog-override', hasBackdrop: true },
  },
  { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  {
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'accent' },
  },
  {
    provide: MAT_RIPPLE_GLOBAL_OPTIONS,
    useExisting: GlobalRippleOptionsService,
  },
  { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
  {
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: { displayDefaultIndicatorType: true, showError: true },
  },
  { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: tooltipOptions },
  {
    provide: MAT_AUTOCOMPLETE_DEFAULT_OPTIONS,
    useValue: { autoActiveFirstOption: true },
  },
  { provide: MatBottomSheet },
  { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
  {
    provide: MAT_EXPANSION_PANEL_DEFAULT_OPTIONS,
    useValue: {
      expandedHeight: '54px',
      collapsedHeight: '54px',
    },
  },
  { provide: APP_CONFIG, useValue: VIMBAL_DI_CONFIG },
  { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
  ScreenTrackingService,
  UserTrackingService,
  Title,
]
