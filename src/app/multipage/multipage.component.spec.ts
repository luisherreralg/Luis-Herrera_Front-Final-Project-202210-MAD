import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

import { MultipageComponent } from './multipage.component';

describe('MultipageComponent', () => {
  let component: MultipageComponent;
  let fixture: ComponentFixture<MultipageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultipageComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        MultipageComponent,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                title: 'mujer',
              }),
            },
          },
        },
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
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MultipageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When the multipage component its invoked', () => {
    it('should call to the sneaker service', () => {
      const serviceSpy = spyOn(
        component.service,
        'searchSneakers'
      ).and.returnValue(
        of({
          sneakers: [
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
        })
      );
      component.ngOnInit();
      expect(serviceSpy).toHaveBeenCalled();
    });
  });
});
