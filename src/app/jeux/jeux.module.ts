import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JeuxPageRoutingModule } from './jeux-routing.module';

import { JeuxPage } from './jeux.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JeuxPageRoutingModule
  ],
  declarations: [JeuxPage]
})
export class JeuxPageModule {}
