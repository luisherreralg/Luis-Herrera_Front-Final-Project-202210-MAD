import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SneakerListComponent } from './sneaker-list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { SneakerListRoutingModule } from './sneaker-list-routing.module';

@NgModule({
  declarations: [SneakerListComponent, ListItemComponent],
  imports: [CommonModule, SneakerListRoutingModule],
  exports: [SneakerListComponent],
})
export class SneakerListModule {}
