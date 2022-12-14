import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Given the scrollTopOnClick method, when its invoked', () => {
    it('should have been called', () => {
      const spyMethod = spyOn(component, 'scrollTopOnClick').and.callThrough();

      component.scrollTopOnClick();
      expect(spyMethod).toHaveBeenCalled();
    });
  });
});
