import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { mockSneakersInitialState } from 'src/app/utils/mocks/mocks';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
      imports: [HttpClientTestingModule],
      providers: [provideMockStore(mockSneakersInitialState)],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When calling to the onInput method', () => {
    it('should call to the services and store', () => {
      const spyService = spyOn(
        component.sneakerService,
        'searchSneakers'
      ).and.returnValues(of({ sneakers: [] }));

      const spyStore = spyOn(component.store, 'dispatch');

      component.onInput();

      expect(spyService).toHaveBeenCalled();
      expect(spyStore).toHaveBeenCalled();
    });
  });

  describe('When calling to the onInput method with an empty search', () => {
    it('should call to the services and store', () => {
      const spyService = spyOn(
        component.sneakerService,
        'getSneakers'
      ).and.returnValues(of({ sneakers: [] }));

      const spyStore = spyOn(component.store, 'dispatch');

      component.onInput();

      expect(spyService).toHaveBeenCalled();
      expect(spyStore).toHaveBeenCalled();
    });
  });
});
