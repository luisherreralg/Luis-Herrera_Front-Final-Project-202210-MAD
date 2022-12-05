import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { ROOT_REDUCERS } from 'src/app/state/app.sate';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
      imports: [HttpClientTestingModule],
      providers: [
        provideMockStore({ initialState: { sneakers: ROOT_REDUCERS } }),
      ],
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
        component.searchService,
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
        component.searchService,
        'getSneakers'
      ).and.returnValues(of({ sneakers: [] }));

      const spyStore = spyOn(component.store, 'dispatch');

      component.onInput();

      expect(spyService).toHaveBeenCalled();
      expect(spyStore).toHaveBeenCalled();
    });
  });
});
