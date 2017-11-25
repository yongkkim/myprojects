import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { HomePage } from './home';


@NgModule({
  declarations: [
    HomePage,

  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    IonicModule.forRoot(HomePage, {
        platforms : {
          ios : {
            // These options are available in ionic-angular@2.0.0-beta.2 and up.
            scrollAssist: false,    // Valid options appear to be [true, false]
            autoFocusAssist: false  // Valid options appear to be ['instant', 'delay', false]
          }
          // http://ionicframework.com/docs/v2/api/config/Config/
        }
      }
	)
	
  ],
  exports: [
    HomePage
  ],
  entryComponents: [
      HomePage
  ]
})
export class HomeModule {}