import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsPreviewPage } from './components-preview.page';

const routes: Routes = [
  {
    path: '',
    component: ComponentsPreviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsPreviewPageRoutingModule {}
