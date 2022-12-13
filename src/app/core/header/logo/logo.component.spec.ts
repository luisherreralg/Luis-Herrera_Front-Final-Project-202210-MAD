import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoComponent } from './logo.component';

describe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Given the scrollTopOnClick method, when its invoked', () => {
    it('should scroll to the top of the window', () => {
      const scrollToSpy = spyOn(window, 'scrollTo');

      component.scrollTopOnClick();
      expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
    });
  });
});
