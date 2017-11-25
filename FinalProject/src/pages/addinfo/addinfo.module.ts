import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddinfoPage } from './addinfo';

@NgModule({

  declarations: [
    AddinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(AddinfoPage),
  ],
  exports: [
    AddinfoPage
  ]
})
export class AddinfoPageModule {
}
