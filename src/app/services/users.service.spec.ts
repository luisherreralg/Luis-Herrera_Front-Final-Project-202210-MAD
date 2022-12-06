import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ProtoUser, User } from '../types/user';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let httpTestingController: HttpTestingController;

  const newUser: ProtoUser = {
    name: 'userTest',
    surname: 'surnameTest',
    email: 'emailTest',
    password: 'passwordTest',
    role: 'user',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UsersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('When the register method is invoked', () => {
    it('should return the new registered user', () => {
      service.register(newUser).subscribe((resp) => {
        expect(resp).not.toBeNull();
        expect(JSON.stringify(resp)).toBe(JSON.stringify(newUser));
      });
      expect(httpTestingController).toBeTruthy();
    });
  });

  describe('When the login method is invoked', () => {
    const existingUser: User = { ...newUser, id: '1' };

    it('should return a token', () => {
      service.login(existingUser).subscribe((resp) => {
        expect(resp).not.toBeNull();
        expect(JSON.stringify(resp)).toBe(JSON.stringify(existingUser));
      });
      expect(httpTestingController).toBeTruthy();
    });
  });
});
