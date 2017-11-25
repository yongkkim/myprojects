import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarPage } from '../car/car';

/**
 * Generated class for the AdinfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adinfo',
  templateUrl: 'adinfo.html',
})
export class AdinfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdinfoPage');
  }

  goBack()
  {
  this.navCtrl.push (CarPage);
  }

}
