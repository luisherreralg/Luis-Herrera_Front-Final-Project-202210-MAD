import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from 'src/app/app.component';
import { Sneaker } from 'src/app/types/sneaker';
import {
  addSneaker,
  deleteSneaker,
  loadSneakers,
  searchSneaker,
} from './sneaker.action.creator';
import { SneakerReducer } from './sneaker.reducer';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ROOT_REDUCERS } from '../app.sate';

describe('Given the sneaker reducer', () => {
  const sneakerMock: Sneaker = {
    id: '1',
    brand: 'Nike',
    model: 'Turbomax',
    size: ['40'],
    price: 100,
    onSalePrice: 90,
    onSale: false,
    stock: 1,
    gender: 'male',
  };

  const initialState = {
    sneakers: [],
  };
  describe('Test loadSneakers action', () => {
    it('should load sneakers', () => {
      const action = loadSneakers({ sneakers: [sneakerMock] });
      const state = SneakerReducer(initialState, action);

      expect(state.sneakers).toEqual([sneakerMock]);
    });
  });

  describe('Test addSneaker action', () => {
    it('should add a sneaker', () => {
      sneakerMock.brand = 'Adidas';
      const action = addSneaker({ newSneaker: sneakerMock });
      const state = SneakerReducer(initialState, action);

      expect(state.sneakers[0].brand).toEqual('Adidas');
    });
  });

  describe('Given the deleteSneaker action ', () => {
    it('should delete an existing sneaker form the state', () => {
      const anotherSneakerMock = { ...sneakerMock };
      anotherSneakerMock.id = '2';
      anotherSneakerMock.brand = 'Adidas';
      const initialState = { sneakers: [sneakerMock, anotherSneakerMock] };

      const action = deleteSneaker({ idDelete: anotherSneakerMock.id });
      const state = SneakerReducer(initialState, action);
      expect(state.sneakers.length).toBe(1);
    });
  });

  describe('Given the searchSneaker action', () => {
    it('should add to the state the sneakers that come from a search', () => {
      const action = searchSneaker({ sneakers: [sneakerMock] });
      const state = SneakerReducer(initialState, action);
      expect(state.sneakers[0]).toBe(sneakerMock);
    });
  });
});