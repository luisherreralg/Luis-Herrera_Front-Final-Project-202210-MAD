import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, HeaderModule, FooterModule],
  exports: [FooterComponent, HeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LayoutModule {}
