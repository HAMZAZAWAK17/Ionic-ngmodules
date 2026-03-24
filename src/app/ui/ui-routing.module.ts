import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UIPage } from './ui.page';

const routes: Routes = [
  {
    path: '',
    component: UIPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UIPageRoutingModule {}
