/* eslint-disable @typescript-eslint/no-unused-vars */
import { Action, createReducer, on } from '@ngrx/store';
import { toggle } from './sidebar.actions';

export const initialState = false;

const _sidebarReducer = createReducer(
  initialState,
  on(toggle, (state) => !state)
);

export function sidebarReducer(state: boolean | undefined, action: Action) {
  return _sidebarReducer(state, action);
}
