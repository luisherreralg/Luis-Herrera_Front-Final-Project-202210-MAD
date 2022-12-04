import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { HeaderRoutingModule } from './header-routing.module';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MenuComponent, SearchBarComponent],
  imports: [CommonModule, HeaderRoutingModule, ReactiveFormsModule],
  exports: [MenuComponent, SearchBarComponent],
})
export class HeaderModule {}
