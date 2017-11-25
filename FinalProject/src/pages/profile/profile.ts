import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {App} from "ionic-angular";
import { MyAdsPage } from '../my-ads/my-ads';
import { BankPage } from '../bank/bank';
import { InfoPage } from '../info/info';
import { HomePage } from '../home/home';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(protected app: App, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  goToMyAds()
 {
 	this.navCtrl.push (MyAdsPage);
 }

 info()
 {
 	this.navCtrl.push(InfoPage);

 }

 goToBank()
 {
 	this.navCtrl.push (BankPage);
 }

 LogOut()
 {
 	this.app.getRootNav().setRoot(HomePage);
 }
}
