import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapPage } from "../map/map";

/**
 * Generated class for the ForPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-for',
  templateUrl: 'for.html',
})
export class ForPage {
ads:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.ads = [
  	{
  		"image": "https://s-media-cache-ak0.pinimg.com/originals/c4/4b/15/c44b1590a94bace4bdcc246f3743a3db.jpg",
  		"estimate" : "$12-34",
  		"wrap": " Full Wrap",
  		"kilometers": "35",
  		"location": " Toronto, Ontario, Canada"
  	},
  	{
  		"image": "https://s-media-cache-ak0.pinimg.com/originals/c4/4b/15/c44b1590a94bace4bdcc246f3743a3db.jpg",
  		"estimate" : "$12-34",
  		"wrap": " Full Wrap",
  		"kilometers": "35",
  		"location": " Toronto, Ontario, Canada"
  	},
  	{
  		"image": "https://s-media-cache-ak0.pinimg.com/originals/c4/4b/15/c44b1590a94bace4bdcc246f3743a3db.jpg",
  		"estimate" : "$12-34",
  		"wrap": " Full Wrap",
  		"kilometers": "35",
  		"location": " Toronto, Ontario, Canada"
  	},

  	]
  }

  goToMap()
  {
  this.navCtrl.push(MapPage);
  }
}
