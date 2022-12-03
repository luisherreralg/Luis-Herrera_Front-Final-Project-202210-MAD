import { createAction, props } from '@ngrx/store';
import { Sneaker } from 'src/app/types/sneaker';

export const loadSneakers = createAction(
  '[Sneaker List] Load Sneakers',
  props<{ sneakers: Sneaker[] }>()
);

export const addSneaker = createAction(
  '[Sneaker List] Add Sneaker',
  props<{ newSneaker: Sneaker }>()
);

export const searchSneaker = createAction(
  '[Sneaker List] Search Sneaker',
  props<{ sneakers: Sneaker[] }>()
);

export const deleteSneaker = createAction(
  '[Sneaker List] Delete Sneaker',
  props<{ idDelete: Sneaker['id'] }>()
);
