import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { ProtoSneaker, Sneaker } from 'src/app/types/sneaker';
import { mockSneakersInitialState } from '../../mocks/mocks';

import { AdminEditModalComponent } from './admin-edit-modal.component';

describe('AdminEditModalComponent', () => {
  let component: AdminEditModalComponent;
  let fixture: ComponentFixture<AdminEditModalComponent>;
  const mockStore = mockSneakersInitialState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AdminEditModalComponent],
      providers: [provideMockStore(mockStore)],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Given the handlerAdminEditModalEvent method, when its invoked', () => {
    it('should call to the modalService', () => {
      spyOn(component.modalService, 'adminEditModal');
      component.handlerAdminEditModalEvent();
      expect(component.modalService.adminEditModal).toHaveBeenCalled();
    });
  });

  describe('Given the handleEditSneaker, when its invoked', () => {
    it('should call to the sneakerService and store dispatcher', () => {
      const formData = {
        brand: 'test',
        model: 'test',
        onSale: 'onSale',
        price: 0,
        onSalePrice: 0,
        stock: 0,
        gender: 'gender',
      };

      component.formEditSneaker.setValue(formData);
      spyOn(component.sneakerService, 'patchSneaker').and.returnValue(
        of({} as Sneaker)
      );
      spyOn(component.store, 'dispatch');

      component.handleEditSneaker();
      expect(component.sneakerService.patchSneaker).toHaveBeenCalled();
      expect(component.store.dispatch).toHaveBeenCalled();
    });
  });

  describe('Given the ngOnInit method, when its invoked', () => {
    it('should call to the localStorageService and sneakerService', () => {
      const spyLocalStorageService = spyOn(
        component.sneakerService,
        'getSneaker'
      ).and.returnValue(of({ sneaker: {} as Sneaker }));
      const spySneakerService = spyOn(
        component.localStorageService,
        'getSneakerId'
      );
      component.ngOnInit();
      expect(spyLocalStorageService).toHaveBeenCalled();
      expect(spySneakerService).toHaveBeenCalled();
    });
  });
});
