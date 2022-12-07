import { ActionReducerMap } from '@ngrx/store';
import { OrderState } from '../interfaces/orders';
import { SneakerState } from '../interfaces/sneakers';
import { OrderReducer } from './order.reducer/order.reducer';
import { SneakerReducer } from './sneaker.reducer/sneaker.reducer';

export interface AppState {
  sneakers: SneakerState;
  orders: OrderState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  sneakers: SneakerReducer,
  orders: OrderReducer,
};
