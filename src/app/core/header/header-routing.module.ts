import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from 'src/app/admin/admin.component';
import { DetailsComponent } from 'src/app/details/details.component';

const routes: Routes = [
  { path: 'multipage/:filter', component: DetailsComponent },
  { path: 'admin', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeaderRoutingModule {}
