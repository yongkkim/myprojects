import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyAdsPage } from '../my-ads/my-ads';
import { BankPage } from '../bank/bank';
import { InfoPage } from '../info/info';
import { HomePage } from '../home/home';
import { App } from "ionic-angular";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

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
