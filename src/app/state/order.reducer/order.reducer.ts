import { createReducer, on } from '@ngrx/store';
import { Order } from 'src/app/types/order';
import * as actions from './order.action.creator';

const initialState = {
  orders: [] as Order[],
};

export const OrderReducer = createReducer(
  initialState,

  on(actions.loadOrders, (state, { orders }) => ({
    orders: [...orders],
  })),

  on(actions.addOrder, (state, { newOrder }) => ({
    orders: [...state.orders, newOrder],
  })),

  on(actions.deleteOrder, (state, { idDelete }) => ({
    orders: state.orders.filter((order) => order.orderId !== idDelete),
  }))
);
