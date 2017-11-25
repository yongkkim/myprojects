import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarPage } from '../car/car';

@Component({
  selector: 'page-sell',
  templateUrl: 'sell.html',
})
export class SellPage {

	public Status: boolean = true;

  constructor(public navCtrl: NavController) {
	}
 
	goNext (){

		this.navCtrl.push(CarPage);

	}

	uploadIMG() {
		this.Status = false;
	}

}
