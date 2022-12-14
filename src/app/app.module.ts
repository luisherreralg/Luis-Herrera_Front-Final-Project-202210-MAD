import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ROOT_REDUCERS } from './state/app.state';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { LayoutModule } from './core/layout.module';
import { MultipageComponent } from './multipage/multipage.component';
import { SneakerListModule } from './sneaker-list/sneaker-list.module';
import { DetailsComponent } from './details/details.component';
import { ModalsModule } from './utils/modals/modals.module';
import { AdminModule } from './admin/admin.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { AboutModule } from './about/about.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MultipageComponent,
    DetailsComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    LayoutModule,
    SneakerListModule,
    ModalsModule,
    AdminModule,
    AboutModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [],
})
export class AppModule {}
