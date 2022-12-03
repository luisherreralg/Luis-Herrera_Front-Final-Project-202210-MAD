import { createReducer, on } from '@ngrx/store';
import { Sneaker } from 'src/app/types/sneaker';
import * as actions from './sneaker.action.creator';

const initialState = {
  sneakers: [] as Sneaker[],
};

export const SneakerReducer = createReducer(
  initialState,

  on(actions.loadSneakers, (state, { sneakers }) => ({
    sneakers: [...sneakers],
  })),

  on(actions.searchSneaker, (state, { sneakers }) => ({
    sneakers: [...sneakers],
  })),

  on(actions.addSneaker, (state, { newSneaker }) => ({
    sneakers: [...state.sneakers, newSneaker],
  })),

  on(actions.deleteSneaker, (state, { idDelete }) => ({
    sneakers: state.sneakers.filter((sneaker) => sneaker.id !== idDelete),
  }))
);
