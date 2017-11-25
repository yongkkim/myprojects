import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PersonalinfoPage } from '../personalinfo/personalinfo';

/**
 * Generated class for the MyAdsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-ads',
  templateUrl: 'my-ads.html',
})
export class MyAdsPage {

  ads: any; 	
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.ads = [ 
 	{
 	 "img" : "https://s-media-cache-ak0.pinimg.com/originals/c4/4b/15/c44b1590a94bace4bdcc246f3743a3db.jpg",
 	 "name": "Snickers ad 1",
 	 "date": "07/07/2017",
 	 "amount": " 2",
 	},
 	{
 	"img" : "https://s-media-cache-ak0.pinimg.com/originals/c4/4b/15/c44b1590a94bace4bdcc246f3743a3db.jpg",
 	"name" : "snickers Ad 2",
 	"date": "07/07/2017",
 	"amount": " 2",
 	}

  	]
  }

  goToPerson(ad) {
  	this.navCtrl.push (PersonalinfoPage, ad);
  }

}
