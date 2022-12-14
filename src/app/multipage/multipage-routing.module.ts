import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MultipageComponent } from './multipage.component';

const routes: Routes = [{ path: '', component: MultipageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MultipageRoutingModule {}
