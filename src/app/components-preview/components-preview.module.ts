import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComponentsPreviewPageRoutingModule } from './components-preview-routing.module';

import { ComponentsPreviewPage } from './components-preview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsPreviewPageRoutingModule
  ],
  declarations: [ComponentsPreviewPage]
})
export class ComponentsPreviewPageModule {}
