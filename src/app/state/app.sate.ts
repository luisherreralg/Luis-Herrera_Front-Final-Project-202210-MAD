import { ActionReducerMap } from '@ngrx/store';
import { SneakerState } from '../interfaces/sneakers';
import { SneakerReducer } from './sneaker.reducer/sneaker.reducer';

export interface AppState {
  sneakers: SneakerState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  sneakers: SneakerReducer,
};
