import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterModalComponent } from './register-modal.component';

describe('RegisterModalComponent', () => {
  let component: RegisterModalComponent;
  let fixture: ComponentFixture<RegisterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Given the hablderRegisterModal event function, when its invoked', () => {
    it('it should call the .emit function when a button is clicked', () => {
      spyOn(component.handlerRegisterModal, 'emit');

      const element = fixture.nativeElement;
      const button = element.querySelector('button');
      button.dispatchEvent(new Event('click'));

      fixture.detectChanges();
      expect(component.handlerRegisterModal.emit).toHaveBeenCalled();
    });
  });
});
