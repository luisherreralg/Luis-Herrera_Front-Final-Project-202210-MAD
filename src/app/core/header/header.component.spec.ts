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
    it('it should return true if the storage service returns an existing token', () => {
      const spyStorageService = spyOn(
        component.storageService,
        'getToken'
      ).and.returnValue('token');
      component.ngOnInit();
      expect(spyStorageService).toHaveBeenCalled();
      expect(component.isLogged).toBeTrue();
    });
  });
});
