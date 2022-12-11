import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { of } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

import { LoginModalComponent } from './login-modal.component';

describe('LoginModalComponent', () => {
  let component: LoginModalComponent;
  let fixture: ComponentFixture<LoginModalComponent>;

  const userServiceSpy = jasmine.createSpyObj('UsersService', [
    'register',
    'login',
  ]);
  userServiceSpy.login.and.returnValue(of({}));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [LoginModalComponent],
      providers: [
        {
          provide: UsersService,
          useValue: userServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Given the loginForm validators, when the form is assigned', () => {
    it('should be false if the form data do not pass the validations', () => {
      component.formLogin.setValue({
        email: '',
        password: 'password',
      });

      expect(component.formLogin.valid).toEqual(false);
    });

    it('should be true if the form data do not pass the validations', () => {
      component.formLogin.setValue({
        email: 'email@gmail.com',
        password: 'password',
      });

      expect(component.formLogin.valid).toEqual(true);
    });
  });

  describe('Given the loginHandler method, when its invoked ', () => {
    it('should not call to the userService if the formData is not valid', fakeAsync(() => {
      const formData = {
        email: '',
        password: 'password',
      };
      component.formLogin.setValue(formData);
      component.loginHandler();

      expect(component.invalidType).toEqual(true);
      tick(3000);
      expect(component.invalidType).toEqual(false);
    }));

    it('should call to the userService if the formData is valid', fakeAsync(() => {
      const formData = {
        email: 'email@gmail.com',
        password: 'password',
      };
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      spyOn(component, 'reload').and.callFake(() => {});

      const spyLocalService = spyOn(component.storageService, 'saveToken');

      component.formLogin.setValue(formData);
      component.loginHandler();

      expect(component.invalidCredentials).toEqual(true);
      tick(3000);
      expect(component.invalidCredentials).toEqual(false);

      expect(userServiceSpy.login).toHaveBeenCalled();
      expect(spyLocalService).toHaveBeenCalled();
    }));
  });

  describe('Given the goToRegisterHandler method, when its invoked', () => {
    it('should call to the modalService', () => {
      const spyModalService = spyOn(component.modalService, 'registerModal');

      component.goToRegisterHanlder();
      expect(spyModalService).toHaveBeenCalled();
    });
  });
});
