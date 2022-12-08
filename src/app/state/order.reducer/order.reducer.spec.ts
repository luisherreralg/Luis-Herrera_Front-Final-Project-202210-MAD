import { Order } from 'src/app/types/order';
import { addOrder, deleteOrder, loadOrders } from './order.action.creator';
import { OrderReducer } from './order.reducer';

describe('Given the OrderReducer', () => {
  const orderMock: Order = {
    size: [],
    cartedItem: {
      id: '1',
      brand: 'Nike',
      model: 'Turbomax',
      size: ['40'],
      price: 100,
      onSalePrice: 90,
      onSale: 'notOnSale',
      stock: 1,
      gender: 'male',
      images: ['url'],
    },
    cartedBy: {
      id: '1',
      name: 'Pepe',
      surname: 'Pepito',
      email: 'pepemail@gmail.com',
      password: '123456',
      role: 'user',
    },
    orderId: '1',
  };

  const initialState = {
    orders: [] as Order[],
  };

  describe('Given the loadOrders action', () => {
    it('should load orders', () => {
      const action = loadOrders({ orders: [orderMock] });
      const state = OrderReducer(initialState, action);

      expect(state.orders).toEqual([orderMock]);
    });
  });

  describe('Given the addOrder action', () => {
    it('should add a new order', () => {
      orderMock.cartedItem.brand = 'Adidas';

      const action = addOrder({ newOrder: orderMock });
      const state = OrderReducer(initialState, action);

      expect(state.orders[0].cartedItem.brand).toEqual('Adidas');
    });
  });

  describe('Given the deleteOrder action', () => {
    it('should delete an existing order', () => {
      const anotherOrderMock = { ...orderMock };
      anotherOrderMock.orderId = '2';
      const initialState = { orders: [orderMock, anotherOrderMock] };

      const action = deleteOrder({ idDelete: orderMock.orderId });
      const state = OrderReducer(initialState, action);

      expect(state.orders.length).toBe(1);
    });
  });
});
