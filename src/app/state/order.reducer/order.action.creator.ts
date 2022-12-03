import { createAction, props } from '@ngrx/store';
import { Order } from 'src/app/types/order';

export const loadOrders = createAction(
  '[Order List] Load Orders',
  props<{ orders: Order[] }>()
);

export const addOrder = createAction(
  '[Order List] Add Order',
  props<{ newOrder: Order }>()
);

export const deleteOrder = createAction(
  '[Order List] Delete Order',
  props<{ idDelete: Order['orderId'] }>()
);
