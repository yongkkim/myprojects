import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModelinfoPage } from './modelinfo';

@NgModule({
  declarations: [
    ModelinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ModelinfoPage),
  ],
  exports: [
    ModelinfoPage
  ]
})
export class ModelinfoPageModule {}
