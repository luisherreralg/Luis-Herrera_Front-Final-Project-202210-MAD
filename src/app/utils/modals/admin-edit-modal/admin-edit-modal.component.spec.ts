import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { Sneaker } from 'src/app/types/sneaker';
import { mockSneakersInitialState } from '../../mocks/mocks';
import { getStorage, provideStorage } from '@angular/fire/storage';

import { AdminEditModalComponent } from './admin-edit-modal.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';

describe('AdminEditModalComponent', () => {
  let component: AdminEditModalComponent;
  let fixture: ComponentFixture<AdminEditModalComponent>;
  const mockStore = mockSneakersInitialState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideStorage(() => getStorage()),
      ],
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

  describe('Given the uploadImage method, when its invoked', () => {
    it('should call to the own method', () => {
      const spy = spyOn(component, 'uploadImage').and.callThrough();
      const mocKEvent = {
        target: {
          files: [
            {
              name: 'test',
              size: 0,
              type: 'image/png',
            },
          ],
        },
      };
      component.uploadImage(mocKEvent);

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Given the getImages method, when its invoked', () => {
    it('should call to the own method', () => {
      const spy = spyOn(component, 'getImages').and.callThrough();
      component.getImages();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Given the handlePostSneaker method, when its invoked', () => {
    it('should call to the own method, the store and the sneakerService', async () => {
      const spy = spyOn(component, 'handlePostSneaker').and.callThrough();
      const spySneakerService = spyOn(
        component.sneakerService,
        'postSneaker'
      ).and.returnValue(of({ sneaker: {} as Sneaker }));
      const spyStore = spyOn(component.store, 'dispatch');

      await component.handlePostSneaker();
      expect(spy).toHaveBeenCalled();
      expect(spySneakerService).toHaveBeenCalled();
      expect(spyStore).toHaveBeenCalled();
    });
  });

  describe('When the ngOnInit method is invoked', () => {
    it('should cahgen postSenaker = true if the sneakerId === "newSneaker"', () => {
      spyOn(component.localStorageService, 'getSneakerId').and.returnValue(
        'NewSneaker'
      );

      component.ngOnInit();
      expect(component.postSneaker).toBeTruthy();
    });

    it('should cahgen postSenaker = false if the sneakerId !== "newSneaker"', () => {
      spyOn(component.localStorageService, 'getSneakerId').and.returnValue(
        'test'
      );
      component.ngOnInit();
      expect(component.postSneaker).toBeFalsy();
    });
  });

  describe('Given the handleNextPhase method, when its invoked', () => {
    it('should change the postSnekaerPhase to +1', () => {
      component.formEditSneaker.setValue({
        brand: 'test',
        model: 'test',
        onSale: 'onSale',
        price: 0,
        onSalePrice: 0,
        stock: 0,
        gender: 'hombre',
      });

      component.handleNextPhase();
      expect(component.postSneakerPhase).toBe(1);
    });
  });

  describe('Given the handlePrevPhase method, when its invoked', () => {
    it('should change the postSneakerPhase to -1', () => {
      component.handlePrevPhase();
      expect(component.postSneakerPhase).toBe(-1);
    });
  });
});
