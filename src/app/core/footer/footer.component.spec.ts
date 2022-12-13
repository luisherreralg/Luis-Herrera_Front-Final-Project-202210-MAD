import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
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
