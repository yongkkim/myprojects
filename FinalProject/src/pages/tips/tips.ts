import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AddinfoPage} from '../addinfo/addinfo'
import { App } from "ionic-angular";
import { HomePage } from '../home/home';
import { ForPage } from '../for/for';
/**
 * Generated class for the TipsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tips',
  templateUrl: 'tips.html',
})
export class TipsPage {

  constructor(protected app: App, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TipsPage');
  }
  next(){
    this.app.getRootNav().setRoot(ForPage);
  }
}
