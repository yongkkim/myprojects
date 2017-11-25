import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AModelinfoPage } from './modelinfo';

@NgModule({
  declarations: [
    AModelinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(AModelinfoPage),
  ],
  exports: [
    AModelinfoPage
  ]
})
export class AModelinfoPageModule {}
