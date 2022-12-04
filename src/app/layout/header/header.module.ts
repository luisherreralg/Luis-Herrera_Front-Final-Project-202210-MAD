import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { HeaderRoutingModule } from './header-routing.module';

@NgModule({
  declarations: [MenuComponent],
  imports: [CommonModule, HeaderRoutingModule],
  exports: [MenuComponent],
})
export class HeaderModule {}
