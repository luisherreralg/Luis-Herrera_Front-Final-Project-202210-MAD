import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { Order } from '../types/order';
import { mockOrderInitialState } from '../utils/mocks/mocks';

import { DetailsComponent } from './details.component';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        provideMockStore(mockOrderInitialState),
        DetailsComponent,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: '1',
              }),
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call to the getSneaker service', () => {
    const spyService = spyOn(component.service, 'getSneaker').and.returnValue(
      of({
        sneaker: {
          id: '1',
          brand: 'testBrand',
          model: 'testModel',
          size: ['40'],
          price: 1,
          onSalePrice: 0,
          onSale: 'onSale',
          stock: 0,
          gender: 'hombre',
          images: ['url1', 'url2'],
        },
      })
    );
    component.ngOnInit();
    expect(spyService).toHaveBeenCalled();
  });

  describe('Given the selectSize method, when its invoked', () => {
    it('should change the selectedSize value', () => {
      component.selectSize('40');
      expect(component.selectedSize).toBe('40');
    });
  });

  describe('Given the addCartHandler method, when its invoked', () => {
    it('should call to the modalServices if there is an existing token', () => {
      const spyStorageService = spyOn(
        component.storageService,
        'getToken'
      ).and.returnValue(null);
      const spyModalService = spyOn(component.modalService, 'loginModal');

      component.addCartHandler();
      expect(spyModalService).toHaveBeenCalled();
      expect(spyStorageService).toHaveBeenCalled();
    });

    it('should return if the selectedSize = "initialValue"', () => {
      const spyStorageService = spyOn(
        component.storageService,
        'getToken'
      ).and.returnValue('token');

      component.selectedSize = 'initialValue';
      component.addCartHandler();

      expect(spyStorageService).toHaveBeenCalled();
    });

    it('should call to the orderService if all the previous conditions are correct', () => {
      const spyStorageService = spyOn(
        component.storageService,
        'getToken'
      ).and.returnValue('token');
      const spyOrderServicePost = spyOn(
        component.orderService,
        'postOrder'
      ).and.returnValue(of({} as Order));
      const spyOrderServiceGet = spyOn(
        component.orderService,
        'getOrders'
      ).and.returnValue(of({ orders: [] }));
      const spyStore = spyOn(component.store, 'dispatch');

      component.selectedSize = '40';

      component.addCartHandler();

      expect(spyStore).toHaveBeenCalled();
      expect(spyStorageService).toHaveBeenCalled();
      expect(spyOrderServicePost).toHaveBeenCalled();
      expect(spyOrderServiceGet).toHaveBeenCalled();
    });
  });

  describe('Given the nextImageHandler method, when its invoked', () => {
    it('should change the values of restOfImages and focusedImage variables', () => {
      component.nextImageHandler();
      expect(component.focusedImage).toBe('');
      expect(component.restOfImages).toEqual(['']);
    });
  });

  describe('Given the prevImageHandler method, when its invoked', () => {
    it('should change the value of the restOfImages and focusedImage variables', () => {
      component.prevImageHandler();
      expect(component.focusedImage).toBe('');
    });
  });
});
