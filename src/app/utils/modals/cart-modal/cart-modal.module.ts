import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartListComponent } from './cart-list/cart-list.component';

@NgModule({
  declarations: [CartListComponent],
  imports: [CommonModule],
  exports: [CartListComponent],
})
export class CartModalModule {}
