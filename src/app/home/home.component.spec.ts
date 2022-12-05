import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideMockStore({
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
                  onSale: false,
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
                  onSale: true,
                  stock: 1,
                  gender: 'male',
                  images: ['url'],
                },
              ],
            },
          },
        }),
      ],
      declarations: [HomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When the Home component is initialized', () => {
    it('Then it should filter the sneakers on sale from the store', () => {
      component.ngOnInit();
      expect(component.onSaleSneakers.length).toBe(1);
    });
  });
});
