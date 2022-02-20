import { Action } from '@ngrx/store';
import { createReducer, on } from '@ngrx/store';
import { VIMBAL_DI_CONFIG } from '../../config/app.config';
import { mode } from './theme.actions';

export const initialState = VIMBAL_DI_CONFIG.dark_theme;

const _themeReducer = createReducer(
  initialState,
  on(mode, (state) => !state)
);

export function themeReducer(
  state: boolean | undefined,
  action: Action
): boolean {
  return _themeReducer(state, action);
}
