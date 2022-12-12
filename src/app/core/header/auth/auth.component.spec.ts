import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AuthComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Given the handlerLoginModal method, when its invoked', () => {
    it('it should be called', () => {
      const spy = spyOn(component, 'handlerLoginModal').and.callThrough();
      component.handlerLoginModal();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Given the handlerRegisterModal method, when its invoked', () => {
    it('it should be called ', () => {
      const spy = spyOn(component, 'handlerRegisterModal').and.callThrough();
      component.handlerRegisterModal();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Given the handlerLogout method, when its invoked', () => {
    it('should call to the storageService', () => {
      const spyStorageService = spyOn(component.storageService, 'deleteToken');

      // eslint-disable-next-line @typescript-eslint/no-empty-function
      spyOn(component, 'reload').and.callFake(() => {});

      component.handlerLogout();
      expect(spyStorageService).toHaveBeenCalled();
    });
  });
});
