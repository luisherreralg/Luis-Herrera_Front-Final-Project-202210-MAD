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

  describe('Given the handlerLoginModalEvent, when its invoked', () => {
    it('it should call to the emit function when the button is clicked', () => {
      // spy on the output emitter
      spyOn(component.handlerLoginModal, 'emit');

      //trigger the click
      const element = fixture.nativeElement;
      const button = element.querySelector('button');
      button.dispatchEvent(new Event('click'));

      // detect changes
      fixture.detectChanges();
      expect(component.handlerLoginModal.emit).toHaveBeenCalled();
    });
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
      expect(userServiceSpy.login).not.toHaveBeenCalled();
    }));

    it('should call to the userService if the formData is valid', fakeAsync(() => {
      const formData = {
        email: 'email@gmail.com',
        password: 'password',
      };

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
});
