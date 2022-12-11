import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Given the ngOnInit method, when its invoked', () => {
    it('should call to the storageService', () => {
      const spyStorageService = spyOn(component.storageService, 'getToken');
      component.ngOnInit();
      expect(spyStorageService).toHaveBeenCalled();
    });

    it('should the isLogged variable to true if there is a token', () => {
      spyOn(component.storageService, 'getToken').and.returnValue('token');

      component.ngOnInit();
      expect(component.isLogged).toBeTruthy();
    });

    it('should change the isAdmin variable to true if the checkTokenRole returns an object with the role = "admin"', () => {
      spyOn(component.storageService, 'getToken').and.returnValue('token');
      spyOn(component.storageService, 'checkTokenRole').and.returnValue({
        role: 'admin',
      });

      component.ngOnInit();
      expect(component.isAdmin).toBeTruthy();
    });
  });
});
