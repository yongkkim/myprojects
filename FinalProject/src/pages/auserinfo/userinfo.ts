import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UploadpicPage} from '../uploadpic/uploadpic';
/**
 * Generated class for the UserinfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-userinfo',
  templateUrl: 'userinfo.html',
})
export class AUserinfoPage {
user: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
	this.user = navParams.get("usertype");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AUserinfoPage');
  }
  DoneInfo(){
    this.navCtrl.push(UploadpicPage, {usertype: this.user});
  }
}
