import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { mockSneakersInitialState } from 'src/app/utils/mocks/mocks';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  const mockSneakers = mockSneakersInitialState.initialState.sneakers.sneakers;

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

  describe('Given the filterSearch method, when its invoked', () => {
    let spyStore: jasmine.Spy;

    beforeEach(() => {
      spyStore = spyOn(component.store, 'dispatch').and.callThrough();
    });

    it('should return the same data if there is not any switch case', () => {
      component.filterSearch({ sneakers: mockSneakers });
      expect(spyStore).toHaveBeenCalled();
    });

    it('should return the gender "Hombre" sneakers if there is a title = "Hombre"', () => {
      component.title = 'Hombre';

      component.filterSearch({ sneakers: mockSneakers });
      expect(spyStore).toHaveBeenCalled();
    });

    it('should return the gender "Mujer" sneakers if there is a title = "Mujer"', () => {
      component.title = 'Mujer';

      component.filterSearch({ sneakers: mockSneakers });
      expect(spyStore).toHaveBeenCalled();
    });

    it('should return the gender "onSale" sneakers if there is a title = "OnSale"', () => {
      component.title = 'OnSale';

      component.filterSearch({ sneakers: mockSneakers });
      expect(spyStore).toHaveBeenCalled();
    });
  });

  describe('Given the pathService service, when the searchBar is invoked', () => {
    it('should call to the pathService', () => {
      const spyPathService = spyOn(
        component.pathService,
        'getPath'
      ).and.returnValue(of('Hombre'));

      new SearchBarComponent(
        component.sneakerService,
        component.store,
        component.pathService
      );

      expect(spyPathService).toHaveBeenCalled();
    });
  });

  describe('Given the searchHandler method, when its invoked', () => {
    it('should call to the sneaker service if the searchform value is not null or an empty string', () => {
      const spySneakerServiceSearch = spyOn(
        component.sneakerService,
        'searchSneakers'
      ).and.returnValue(of({ sneakers: [] }));
      const spyFilterSearch = spyOn(component, 'filterSearch');
      component.searchForm.setValue({ search: 'test' });

      component.searchHandler();

      expect(spySneakerServiceSearch).toHaveBeenCalled();
      expect(spyFilterSearch).toHaveBeenCalled();
    });

    it('should call to the sneaker service if the searchform value is not null or an empty string', () => {
      component.searchForm.setValue({ search: null });
      const spySneakerServiceGet = spyOn(
        component.sneakerService,
        'getSneakers'
      ).and.returnValue(of({ sneakers: [] }));
      const spyFilterSearch = spyOn(component, 'filterSearch');

      component.searchHandler();
      expect(spySneakerServiceGet).toHaveBeenCalled();
      expect(spyFilterSearch).toHaveBeenCalled();
    });
  });
});
