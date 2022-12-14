import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultipageRoutingModule } from './multipage-routing.module';
import { MultipageComponent } from './multipage.component';
import { SneakerListModule } from '../sneaker-list/sneaker-list.module';

@NgModule({
  declarations: [MultipageComponent],
  imports: [CommonModule, MultipageRoutingModule, SneakerListModule],
  exports: [MultipageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MultipageModule {}
