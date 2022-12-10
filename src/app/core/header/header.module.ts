import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { HeaderRoutingModule } from './header-routing.module';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoComponent } from './logo/logo.component';
import { BannerComponent } from './banner/banner.component';
import { AuthComponent } from './auth/auth.component';
import { CartComponent } from './cart/cart.component';
import { BannerThreeComponent } from './banner-three/banner-three.component';

@NgModule({
  declarations: [
    MenuComponent,
    SearchBarComponent,
    LogoComponent,
    BannerComponent,
    AuthComponent,
    CartComponent,
    BannerThreeComponent,
  ],
  imports: [CommonModule, HeaderRoutingModule, ReactiveFormsModule],
  exports: [
    MenuComponent,
    SearchBarComponent,
    LogoComponent,
    BannerComponent,
    AuthComponent,
    CartComponent,
    BannerThreeComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderModule {}
