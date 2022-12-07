import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { of } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

import { RegisterModalComponent } from './register-modal.component';

describe('RegisterModalComponent', () => {
  let component: RegisterModalComponent;
  let fixture: ComponentFixture<RegisterModalComponent>;

  const userServiceSpy = jasmine.createSpyObj('UsersService', [
    'register',
    'login',
  ]);
  userServiceSpy.register.and.returnValue(of({}));
  userServiceSpy.login.and.returnValue(of({}));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RegisterModalComponent],
      providers: [
        {
          provide: UsersService,
          useValue: userServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Given the handlerRegisterModal event function, when its invoked', () => {
    it('it should call the .emit function when a button is clicked', () => {
      spyOn(component.handlerRegisterModal, 'emit');

      const element = fixture.nativeElement;
      const button = element.querySelector('button');
      button.dispatchEvent(new Event('click'));

      fixture.detectChanges();
      expect(component.handlerRegisterModal.emit).toHaveBeenCalled();
    });
  });

  describe('Given the registerForm validators, when the form is assigned', () => {
    it('should be false if the form data do not pass the validations', () => {
      component.formRegister.setValue({
        name: 'name',
        surname: 'surname',
        email: 'email',
        password: 'password',
        role: 'test',
      });

      expect(component.formRegister.valid).toEqual(false);
    });

    it('should be true if the form data do not pass the validations', () => {
      component.formRegister.setValue({
        name: 'name',
        surname: 'surname',
        email: 'email@gmail.com',
        password: 'password',
        role: 'test',
      });

      expect(component.formRegister.valid).toEqual(true);
    });
  });

  describe('Given the registerHandler method, when its invoked ', () => {
    it('should not call to the userService if the formData is not valid', fakeAsync(() => {
      const formData = {
        name: 'name',
        surname: 'surname',
        email: '',
        password: 'password',
        role: 'test',
      };
      component.formRegister.setValue(formData);
      component.registerHandler();

      expect(component.invalidType).toEqual(true);
      tick(3000);
      expect(component.invalidType).toEqual(false);
    }));

    it('should call to the userService if the formData is valid', fakeAsync(() => {
      const formData = {
        name: 'name',
        surname: 'surname',
        email: 'email@gmail.com',
        password: 'password',
        role: 'test',
      };

      const spyLocalService = spyOn(component.storageService, 'saveToken');

      component.formRegister.setValue(formData);
      component.registerHandler();

      expect(component.invalidCredentials).toEqual(true);
      tick(3000);
      expect(component.invalidCredentials).toEqual(false);

      expect(userServiceSpy.register).toHaveBeenCalled();
      expect(userServiceSpy.login).toHaveBeenCalled();
      expect(spyLocalService).toHaveBeenCalled();
    }));
  });
});
