import { Order } from 'src/app/types/order';

export const mockInitialState = {
  initialState: {
    sneakers: {
      sneakers: [
        {
          id: '1',
          brand: 'brandTest',
          model: 'modelTest',
          size: ['40'],
          price: 100,
          onSalePrice: 90,
          onSale: 'notOnSale',
          stock: 1,
          gender: 'male',
          images: ['url'],
        },
        {
          id: '2',
          brand: 'brandTest',
          model: 'modelTest',
          size: ['40'],
          price: 100,
          onSalePrice: 90,
          onSale: 'onSale',
          stock: 1,
          gender: 'male',
          images: ['url'],
        },
      ],
    },
  },
};

export const mockOrderInitialState = {
  initialState: {
    orders: {
      orders: [
        {
          size: [],
          cartedItem: {
            id: '',
            brand: '',
            model: '',
            size: [],
            price: 0,
            onSalePrice: 0,
            onSale: '',
            stock: 0,
            gender: '',
            images: [],
          },
          cartedBy: {
            id: '',
            name: '',
            surname: '',
            email: '',
            password: '',
            role: 'user',
          },
          orderId: '',
        },
      ],
    },
  },
};
