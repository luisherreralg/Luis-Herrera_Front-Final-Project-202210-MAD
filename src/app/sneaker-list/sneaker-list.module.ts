import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SneakerListComponent } from './sneaker-list.component';
import { ListItemComponent } from './list-item/list-item.component';

@NgModule({
  declarations: [SneakerListComponent, ListItemComponent],
  imports: [CommonModule],
  exports: [SneakerListComponent],
})
export class SneakerListModule {}
