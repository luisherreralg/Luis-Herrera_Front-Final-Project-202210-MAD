import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('When getToken is invoked', () => {
    it('should call to the localStorage.getItem method', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);

      service.getToken();
      expect(localStorage.getItem).toHaveBeenCalled();
    });

    it('should return a token if there is an existing one saved before', () => {
      spyOn(localStorage, 'getItem').and.returnValue('token');

      service.getToken();
      expect(localStorage.getItem).toHaveBeenCalledWith('token');
    });
  });

  describe('When saveToken is invoked', () => {
    it('should call to the localStorage.setItem method', () => {
      spyOn(localStorage, 'setItem');

      service.saveToken('token');
      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });

  describe('When deleteToken is invoked', () => {
    it('should call to the localStorage.removeItem method', () => {
      spyOn(localStorage, 'removeItem');

      service.deleteToken();
      expect(localStorage.removeItem).toHaveBeenCalled();
    });
  });

  describe('When checkTokenRole is invoked', () => {
    it('should call to the localStorage.getItem method', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);

      service.checkTokenRole('token');
      expect(localStorage.getItem).toHaveBeenCalled();
    });

    it('should return a role if there is an existing one saved before', () => {
      spyOn(localStorage, 'getItem').and.returnValue('role');

      service.checkTokenRole(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
      );
      expect(localStorage.getItem).toHaveBeenCalledWith('role');
    });
  });

  describe('When the saveSneakerId method is invoked', () => {
    it('should call to the localStorage.setItem method', () => {
      spyOn(localStorage, 'setItem');

      service.saveSneakerId('id');
      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });

  describe('When the deleteSneakerId method is invoked', () => {
    it('should call to the localStorage.removeItem method', () => {
      spyOn(localStorage, 'removeItem');

      service.deleteSneakerId();
      expect(localStorage.removeItem).toHaveBeenCalled();
    });
  });
});
