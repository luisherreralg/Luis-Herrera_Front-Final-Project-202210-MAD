import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { Sneaker } from 'src/app/types/sneaker';
import { mockSneakersInitialState } from 'src/app/utils/mocks/mocks';

import { AdminListComponent } from './admin-list.component';

describe('AdminListComponent', () => {
  let component: AdminListComponent;
  let fixture: ComponentFixture<AdminListComponent>;
  const mockStore = mockSneakersInitialState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AdminListComponent],
      providers: [provideMockStore(mockStore)],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Given the handleDeleteSneaker  method, when its invoked', () => {
    it('should call to the sneakerServices', () => {
      const spySneakersService = spyOn(
        component.sneakerServices,
        'deleteSneaker'
      ).and.returnValue(of({} as Sneaker));

      component.handleDeleteSneaker('sneakerID');
      expect(spySneakersService).toHaveBeenCalled();
    });
  });

  describe('Given the handleEditSneaker  method, when its invoked', () => {
    it('should call to the localStorageService', () => {
      const spySneakersService = spyOn(
        component.localStorageService,
        'saveSneakerId'
      );

      component.handleEditSneaker('sneakerID');
      expect(spySneakersService).toHaveBeenCalled();
    });
  });

  describe('Given the ngOnInit method, when its invoked', () => {
    it('should call to the sneakerServices', () => {
      const spySneakersService = spyOn(
        component.sneakerServices,
        'getSneakers'
      ).and.returnValue(of({ sneakers: [] }));

      component.ngOnInit();
      expect(spySneakersService).toHaveBeenCalled();
    });
  });
});
