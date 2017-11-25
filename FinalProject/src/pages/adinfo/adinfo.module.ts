import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdinfoPage } from './adinfo';

@NgModule({
  declarations: [
    AdinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(AdinfoPage),
  ],
})
export class AdinfoPageModule {}
