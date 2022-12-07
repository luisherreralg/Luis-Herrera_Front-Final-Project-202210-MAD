import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartModalComponent } from './cart-modal/cart-modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { RegisterModalComponent } from './register-modal/register-modal.component';
import { CartModalModule } from './cart-modal/cart-modal.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CartModalComponent,
    LoginModalComponent,
    RegisterModalComponent,
  ],
  imports: [CommonModule, CartModalModule, ReactiveFormsModule],
  exports: [CartModalComponent, LoginModalComponent, RegisterModalComponent],
})
export class ModalsModule {}
