import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DModelinfoPage } from './modelinfo';

@NgModule({
  declarations: [
    DModelinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(DModelinfoPage),
  ],
  exports: [
    DModelinfoPage
  ]
})
export class DModelinfoPageModule {}
