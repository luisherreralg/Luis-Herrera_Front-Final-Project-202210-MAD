import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ROOT_REDUCERS } from './state/app.sate';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { LayoutModule } from './layout/layout.module';
import { MultipageComponent } from './multipage/multipage.component';
import { SneakerListModule } from './sneaker-list/sneaker-list.module';
import { DetailsComponent } from './details/details.component';
import { LoginModalComponent } from './utils/modals/login-modal/login-modal.component';
import { RegisterModalComponent } from './utils/modals/register-modal/register-modal.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, MultipageComponent, DetailsComponent, LoginModalComponent, RegisterModalComponent],
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
