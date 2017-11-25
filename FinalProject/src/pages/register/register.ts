import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DUserinfoPage } from '../duserinfo/userinfo'
import { AUserinfoPage } from '../auserinfo/userinfo'
/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  goToDriver()
  {
      this.navCtrl.push(DUserinfoPage, {usertype: "driver"});
  }

  goToAd()
  {
    this.navCtrl.push(AUserinfoPage, {usertype: "company"});
  }
}
