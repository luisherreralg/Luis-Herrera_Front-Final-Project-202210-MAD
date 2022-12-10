import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { mockSneakersInitialState } from '../utils/mocks/mocks';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [provideMockStore(mockSneakersInitialState)],
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
      expect(component.onSaleSneakers.length).toBe(2);
    });

    it('should call to the sneakerService and store', () => {
      const spySneakerService = spyOn(
        component.sneakerService,
        'getSneakers'
      ).and.returnValue(of({ sneakers: [] }));
      const spyStore = spyOn(component.store, 'dispatch');

      component.ngOnInit();

      expect(spySneakerService).toHaveBeenCalled();
      expect(spyStore).toHaveBeenCalled();
    });
  });
});
