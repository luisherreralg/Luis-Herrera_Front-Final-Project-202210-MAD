import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MultipageComponent } from 'src/app/multipage/multipage.component';

const routes: Routes = [
  { path: 'details/:filter', component: MultipageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SneakerListRoutingModule {}
