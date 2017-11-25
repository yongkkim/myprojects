import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PersonalPage } from '../personal/personal';
/**
 * Generated class for the VerifyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verify',
  templateUrl: 'verify.html',
})
export class VerifyPage {
	users: any;

  constructor(public navCtrl: NavController) {
  this.users = [
						      {"url":"../../assets/Images/face2.jpg",
						      	"title" : "Jake",
						      	"car" : "Kia Ultima",
						      	"rate" : "0",
						      	"ads" : [
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						  		{"img": "../../assets/Images/carad1.JPG"}
						      	],
						       code: 1},
						      {"url":"../../assets/Images/face3.jpg",
						      	"title": "Tina",
						      	"car" : "Honda Civic",
						      	"rate" : "0",
						      	"ads" : [
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						  		{"img": "../../assets/Images/carad1.JPG"}
						      	],
						       code: 2},
						      {"url":"../../assets/Images/face4.jpg",
						      	"title" : "Johnny",
						      	"car" : "Kia Ultima",
						      	"rate" : "0",
						      	"ads" : [
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						  		{"img": "../../assets/Images/carad1.JPG"}
						      	],
						       code: 3},
						      {"url":"../../assets/Images/face5.jpg",
						      	"title": "Doc Brown",
						      	"car" : "Delorian",
						      	"rate" : "0",
						      	"ads" : [
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						  		{"img": "../../assets/Images/carad1.JPG"}
						      	],
						       code: 4},
						       {"url":"../../assets/Images/face4.jpg",
						      	"title" : "Johnny",
						      	"car" : "Kia Ultima",
						      	"rate" : "0",
						      	"ads" : [
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						  		{"img": "../../assets/Images/carad1.JPG"}
						      	],
						       code: 5},
						      {"url":"../../assets/Images/face5.jpg",
						      	"title": "Doc Brown",
						      	"car" : "Delorian",
						      	"rate" : "0",
						      	"ads" : [
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						  		{"img": "../../assets/Images/carad1.JPG"}
						      	],
						       code: 6},
						       	      {"url":"../../assets/Images/face4.jpg",
						      	"title" : "Johnny",
						      	"car" : "Kia Ultima",
						      	"rate" : "0",
						      	"ads" : [
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						  		{"img": "../../assets/Images/carad1.JPG"}
						      	],
						       code: 7},
						      {"url":"../../assets/Images/face5.jpg",
						      	"title": "Doc Brown",
						      	"car" : "Delorian",
						      	"rate" : "0",
						      	"ads" : [
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						  		{"img": "../../assets/Images/carad1.JPG"}
						      	],
						       code: 8},
						       {"url":"../../assets/Images/face4.jpg",
						      	"title" : "Johnny",
						      	"car" : "Kia Ultima",
						      	"rate" : "0",
						      	"ads" : [
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						  		{"img": "../../assets/Images/carad1.JPG"}
						      	],
						       code: 9},
						      {"url":"../../assets/Images/face5.jpg",
						      	"title": "Doc Brown",
						      	"car" : "Delorian",
						      	"rate" : "0",
						      	"ads" : [
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						  		{"img": "../../assets/Images/carad1.JPG"}
						      	],
						       code: 10},
						        {"url":"../../assets/Images/face3.jpg",
						      	"title": "Tina",
						      	"car" : "Honda Civic",
						      	"rate" : "0",
						      	"ads" : [
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						  		{"img": "../../assets/Images/carad1.JPG"}
						      	],
						       code: 11},
						      {"url":"../../assets/Images/face4.jpg",
						      	"title" : "Johnny",
						      	"car" : "Kia Ultima",
						      	"rate" : "0",
						      	"ads" : [
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						  		{"img": "../../assets/Images/carad1.JPG"}
						      	],
						       code: 12},
						      {"url":"../../assets/Images/face5.jpg",
						      	"title": "Doc Brown",
						      	"car" : "Delorian",
						      	"rate" : "0",
						      	"ads" : [
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						  		{"img": "../../assets/Images/carad1.JPG"}
						      	],
						       code: 13},
						       {"url":"../../assets/Images/face4.jpg",
						      	"title" : "Johnny",
						      	"car" : "Kia Ultima",
						      	"rate" : "0",
						      	"ads" : [
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						  		{"img": "../../assets/Images/carad1.JPG"}
						      	],
						       code: 14},
						      {"url":"../../assets/Images/face5.jpg",
						      	"title": "Doc Brown",
						      	"car" : "Delorian",
						      	"rate" : "0",
						      	"ads" : [
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						  		{"img": "../../assets/Images/carad1.JPG"}
						      	],
						       code: 15},
						       	      {"url":"../../assets/Images/face4.jpg",
						      	"title" : "Johnny",
						      	"car" : "Kia Ultima",
						      	"rate" : "0",
						      	"ads" : [
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						  		{"img": "../../assets/Images/carad1.JPG"}
						      	],
						       code: 16},
						      {"url":"../../assets/Images/face5.jpg",
						      	"title": "Doc Brown",
						      	"car" : "Delorian",
						      	"rate" : "0",
						      	"ads" : [
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						  		{"img": "../../assets/Images/carad1.JPG"}
						      	],
						       code: 17},
						       {"url":"../../assets/Images/face4.jpg",
						      	"title" : "Johnny",
						      	"car" : "Kia Ultima",
						      	"rate" : "0",
						      	"ads" : [
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						  		{"img": "../../assets/Images/carad1.JPG"}
						      	],
						       code: 18},
						      {"url":"../../assets/Images/face5.jpg",
						      	"title": "Doc Brown",
						      	"car" : "Delorian",
						      	"rate" : "0",
						      	"ads" : [
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						  		{"img": "../../assets/Images/carad1.JPG"}
						      	],
						       code: 19},
						       {"url":"../../assets/Images/face4.jpg",
						      	"title" : "Johnny",
						      	"car" : "Kia Ultima",
						      	"rate" : "0",
						      	"ads" : [
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						      	{"img": "../../assets/Images/carad1.JPG"},
						  		{"img": "../../assets/Images/carad1.JPG"}
						      	],
						       code: 20}
						    ];


  }

  goToPerson(user) {
  	this.navCtrl.push (PersonalPage, user);
  }


}
