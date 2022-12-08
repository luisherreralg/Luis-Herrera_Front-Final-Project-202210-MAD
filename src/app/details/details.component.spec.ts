import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
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
});
