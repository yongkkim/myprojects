import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AUserinfoPage } from './userinfo';

@NgModule({
  declarations: [
    AUserinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(AUserinfoPage),
  ],
  exports: [
    AUserinfoPage
  ]
})
export class UserinfoPageModule {}
