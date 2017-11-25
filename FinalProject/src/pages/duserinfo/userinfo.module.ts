import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DUserinfoPage } from './userinfo';

@NgModule({
  declarations: [
    DUserinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(DUserinfoPage),
  ],
  exports: [
    DUserinfoPage
  ]
})
export class UserinfoPageModule {}
