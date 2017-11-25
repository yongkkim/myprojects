import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DModelinfoPage} from '../dmodelinfo/modelinfo';
import {AModelinfoPage} from '../amodelinfo/modelinfo';
import { HomePage } from '../home/home';
import {App} from "ionic-angular";

/**
 * Generated class for the UploadpicPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-uploadpic',
  templateUrl: 'uploadpic.html',
})
export class UploadpicPage {
uploadoptions: any;
user: any;
  constructor(protected app: App, public navCtrl: NavController, public navParams: NavParams) {
		this.uploadoptions = [
					{"img": "https://static.dpaw.wa.gov.au/static/libs/ionicons/1.1/src/icon-ios7-camera.svg"},
					{"img": "https://static.dpaw.wa.gov.au/static/libs/ionicons/1.1/src/icon-folder.svg"}
				  ];
		this.user = navParams.get('usertype');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadpicPage');
  }
  modelnext(){
	if(this.user === "driver"){this.navCtrl.push(DModelinfoPage);}
	if(this.user === "company"){this.navCtrl.push(AModelinfoPage);}
	
  }

  goHome()
  {
    this.app.getRootNav().setRoot(HomePage);
  }
}
