import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditModalComponent } from './admin-edit-modal.component';

describe('AdminEditModalComponent', () => {
  let component: AdminEditModalComponent;
  let fixture: ComponentFixture<AdminEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
