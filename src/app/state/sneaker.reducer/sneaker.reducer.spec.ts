import {
  addSneaker,
  deleteSneaker,
  loadSneakers,
  searchSneaker,
} from './sneaker.action.creator';
import { SneakerReducer } from './sneaker.reducer';
import { Sneaker } from '../../types/sneaker';

describe('Given the sneaker reducer', () => {
  const sneakerMock: Sneaker = {
    id: '1',
    brand: 'Nike',
    model: 'Turbomax',
    size: ['40'],
    price: 100,
    onSalePrice: 90,
    onSale: 'notOnsale',
    stock: 1,
    gender: 'male',
    images: ['url'],
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
