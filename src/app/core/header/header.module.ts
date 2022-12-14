import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoComponent } from './logo/logo.component';
import { BannerComponent } from './banner/banner.component';
import { AuthComponent } from './auth/auth.component';
import { CartComponent } from './cart/cart.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [
    MenuComponent,
    SearchBarComponent,
    LogoComponent,
    BannerComponent,
    AuthComponent,
    CartComponent,
  ],
  imports: [CommonModule, AppRoutingModule, ReactiveFormsModule],
  exports: [
    MenuComponent,
    SearchBarComponent,
    LogoComponent,
    BannerComponent,
    AuthComponent,
    CartComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderModule {}
