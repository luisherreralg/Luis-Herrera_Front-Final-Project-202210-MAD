import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginModalComponent } from './login-modal.component';

describe('LoginModalComponent', () => {
  let component: LoginModalComponent;
  let fixture: ComponentFixture<LoginModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Given the hanlderLoginModalEvent, when its invoked', () => {
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
});
