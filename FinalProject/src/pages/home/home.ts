import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { AddinfoPage } from '../addinfo/addinfo';
import { TabsPage } from '../tabs/tabs';
import { Tab1Page } from '../tab1/tab1';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	qty: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.qty = 1;
  }
  
login() {
  	this.navCtrl.push(TabsPage);
  }

loginU() 
{
  this.navCtrl.push(Tab1Page);
}

 register(){
 	this.navCtrl.push(RegisterPage);
 }
}
