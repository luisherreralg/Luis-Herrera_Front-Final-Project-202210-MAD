import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent, canActivate: [AuthGuard] },
];

@NgModule({
  providers: [AuthGuard],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
