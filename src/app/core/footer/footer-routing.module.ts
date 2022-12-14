import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from 'src/app/about/about.component';

const routes: Routes = [
  // { path: 'multipage/:filter', component: DetailsComponent },
  // { path: 'admin', component: AdminComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FooterRoutingModule {}
