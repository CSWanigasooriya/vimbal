import { AuthService } from './../services/auth.service';
import { MAT_AUTOCOMPLETE_DEFAULT_OPTIONS } from '@angular/material/autocomplete';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import {
  ErrorStateMatcher,
  MAT_DATE_LOCALE,
  MAT_RIPPLE_GLOBAL_OPTIONS,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import { MAT_CHIPS_DEFAULT_OPTIONS } from '@angular/material/chips';
import { MAT_BOTTOM_SHEET_DEFAULT_OPTIONS } from '@angular/material/bottom-sheet';
import {
  MatCheckboxDefaultOptions,
  MAT_CHECKBOX_DEFAULT_OPTIONS,
} from '@angular/material/checkbox';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { COMMA, ENTER, TAB } from '@angular/cdk/keycodes';
import { GlobalRippleOptionsService } from '../services/global-ripple-options.service';
import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MatTooltipDefaultOptions,
} from '@angular/material/tooltip';
import { APP_CONFIG, VIMBAL_DI_CONFIG } from './app.config';
import { LoggerService } from '../services/logger.service';
import { StorageService } from '../services/storage.service';
import { Title } from '@angular/platform-browser';

/** Custom options the configure the tooltip's default show/hide delays. */
export const tooltipOptions: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 1000,
  touchendHideDelay: 1000,
};

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
  { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
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
  { provide: APP_CONFIG, useValue: VIMBAL_DI_CONFIG },
  { provide: LoggerService },
  { provide: StorageService },
  { provide: Title },
  { provide: AuthService },
];
