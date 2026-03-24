import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferDataPageRoutingModule } from './transfer-data-routing.module';

import { TransferDataPage } from './transfer-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransferDataPageRoutingModule
  ],
  declarations: [TransferDataPage]
})
export class TransferDataPageModule {}
