import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SneakerListModule } from '../sneaker-list/sneaker-list.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, SneakerListModule],
  exports: [HomeComponent],
})
export class HomeModule {}
