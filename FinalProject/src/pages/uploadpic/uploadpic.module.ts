import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadpicPage } from './uploadpic';

@NgModule({
  declarations: [
    UploadpicPage,
  ],
  imports: [
    IonicPageModule.forChild(UploadpicPage),
  ],
  exports: [
    UploadpicPage
  ]
})
export class UploadpicPageModule {}
