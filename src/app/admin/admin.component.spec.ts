import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { mockSneakersInitialState } from '../utils/mocks/mocks';

import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  const mockStore = mockSneakersInitialState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [provideMockStore(mockStore)],
      declarations: [AdminComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When the ngOnInit method is invoked', () => {
    it('should call to the sneakersService', () => {
      const spySneakersService = spyOn(
        component.sneakersService,
        'getSneakers'
      ).and.returnValue(of({ sneakers: [] }));

      component.ngOnInit();
      expect(spySneakersService).toHaveBeenCalled();
    });
  });
});
