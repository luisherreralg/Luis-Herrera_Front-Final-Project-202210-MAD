import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ROOT_REDUCERS } from './state/app.sate';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { LayoutModule } from './layout/layout.module';
import { MultipageComponent } from './multipage/multipage.component';
import { SneakerListModule } from './sneaker-list/sneaker-list.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    MultipageComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    LayoutModule,
    SneakerListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
