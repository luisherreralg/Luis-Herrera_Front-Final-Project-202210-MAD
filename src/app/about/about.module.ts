import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { BannerThreeComponent } from './banner-three/banner-three.component';

@NgModule({
  declarations: [AboutComponent, BannerThreeComponent],
  imports: [CommonModule],
  exports: [AboutComponent],
})
export class AboutModule {}
