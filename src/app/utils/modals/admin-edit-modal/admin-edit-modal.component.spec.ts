import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { mockSneakersInitialState } from '../../mocks/mocks';

import { AdminEditModalComponent } from './admin-edit-modal.component';

describe('AdminEditModalComponent', () => {
  let component: AdminEditModalComponent;
  let fixture: ComponentFixture<AdminEditModalComponent>;
  const mockStore = mockSneakersInitialState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AdminEditModalComponent],
      providers: [provideMockStore(mockStore)],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
