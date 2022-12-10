import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerThreeComponent } from './banner-three.component';

describe('BannerThreeComponent', () => {
  let component: BannerThreeComponent;
  let fixture: ComponentFixture<BannerThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BannerThreeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BannerThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Given the animateModel method, when its invoked', () => {
    it('should change the this.model value', () => {
      spyOn(component, 'animateModel').and.callThrough();
      component.animateModel();
      expect(component.animateModel).toHaveBeenCalled();
    });
  });

  describe('Given the createScene method, when its invoked', () => {
    it('should do things', () => {
      spyOn(component, 'createScene').and.callThrough();
      spyOnProperty(component, 'canvas', 'get').and.returnValue(
        document.createElement('canvas')
      );

      component.createScene();
      expect(component.createScene).toHaveBeenCalled();
    });
  });
});
