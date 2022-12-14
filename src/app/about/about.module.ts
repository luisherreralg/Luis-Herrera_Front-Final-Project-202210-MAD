import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { BannerThreeComponent } from './banner-three/banner-three.component';
import { AboutRoutingModule } from './about-routing.module';

@NgModule({
  declarations: [AboutComponent, BannerThreeComponent],
  imports: [CommonModule, AboutRoutingModule],
  exports: [AboutComponent],
})
export class AboutModule {}
