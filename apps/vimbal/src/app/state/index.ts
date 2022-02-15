import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { counterReducer } from './counter.reducer';
import { hydrationMetaReducer } from './hydration/hydration.reducer';

export interface RootState {
  count: number;
}

export const reducers: ActionReducerMap<RootState> = {
  count: counterReducer,
};

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];
