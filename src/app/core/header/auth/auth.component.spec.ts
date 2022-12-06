import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
});
