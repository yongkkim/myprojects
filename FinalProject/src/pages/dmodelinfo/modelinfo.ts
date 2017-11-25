import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TipsPage} from '../tips/tips'
/**
 * Generated class for the ModelinfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modelinfo',
  templateUrl: 'modelinfo.html',
})
export class DModelinfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DModelinfoPage');
  }
  DoneInfo(){
    this.navCtrl.push(TipsPage);
  }
}
