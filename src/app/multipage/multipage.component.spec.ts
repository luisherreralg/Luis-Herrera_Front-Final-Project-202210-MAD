import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { mockSneakersInitialState } from '../utils/mocks/mocks';

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
            params: of({
              title: 'title',
            }),
          },
        },
        provideMockStore(mockSneakersInitialState),
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
      ).and.returnValue(of({ sneakers: [] }));
      component.ngOnInit();
      expect(serviceSpy).toHaveBeenCalled();
    });
  });

  describe('When the multipage component its invoked and the title is "onSale,"', () => {
    it('should filter the onSale sneakers to the list', () => {
      const mockSneaker =
        mockSneakersInitialState.initialState.sneakers.sneakers[0];
      mockSneaker.onSale = 'onSale';

      TestBed.get(ActivatedRoute).params = of({
        title: 'onSale',
      });

      spyOn(component.service, 'searchSneakers').and.returnValue(
        of({ sneakers: [mockSneaker] })
      );

      component.ngOnInit();
      expect(component.sneakers).toEqual([mockSneaker]);
    });
  });
});
