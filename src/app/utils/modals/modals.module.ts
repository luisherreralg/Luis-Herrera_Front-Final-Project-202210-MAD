import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  InjectionToken,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartModalComponent } from './cart-modal/cart-modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { RegisterModalComponent } from './register-modal/register-modal.component';
import { CartModalModule } from './cart-modal/cart-modal.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminEditModalComponent } from './admin-edit-modal/admin-edit-modal.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';

export const WINDOW = new InjectionToken('WINDOW');
@NgModule({
  declarations: [
    CartModalComponent,
    LoginModalComponent,
    RegisterModalComponent,
    AdminEditModalComponent,
  ],
  imports: [
    CommonModule,
    CartModalModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
  ],
  exports: [
    CartModalComponent,

    LoginModalComponent,
    RegisterModalComponent,
    AdminEditModalComponent,
  ],
  providers: [
    {
      provide: WINDOW,
      useValue: window,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ModalsModule {}
