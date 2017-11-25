import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdinfoPage } from '../adinfo/adinfo';

/**
 * Generated class for the CarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-car',
  templateUrl: 'car.html',
})
export class CarPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  FinalStep() {
  	this.navCtrl.push(AdinfoPage);
  }
}
