import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [AdminComponent, AdminListComponent],
  imports: [CommonModule, AdminRoutingModule],
  exports: [AdminComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule {}
