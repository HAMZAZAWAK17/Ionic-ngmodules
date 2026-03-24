import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UIPageRoutingModule } from './ui-routing.module';

import { UIPage } from './ui.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UIPageRoutingModule
  ],
  declarations: [UIPage]
})
export class UIPageModule {}
