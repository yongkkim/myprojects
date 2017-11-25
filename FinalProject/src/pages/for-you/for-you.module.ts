import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForYouPage } from './for-you';

@NgModule({
  declarations: [
    ForYouPage,
  ],
  imports: [
    IonicPageModule.forChild(ForYouPage),
  ],
})
export class ForYouPageModule {}
