import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { HeaderRoutingModule } from './header-routing.module';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoComponent } from './logo/logo.component';
import { BannerComponent } from './banner/banner.component';

@NgModule({
  declarations: [
    MenuComponent,
    SearchBarComponent,
    LogoComponent,
    BannerComponent,
  ],
  imports: [CommonModule, HeaderRoutingModule, ReactiveFormsModule],
  exports: [MenuComponent, SearchBarComponent, LogoComponent, BannerComponent],
})
export class HeaderModule {}
