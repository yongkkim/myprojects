import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map';
import { PersonalPage } from '../personal/personal';

declare var google;

@Component({
  selector: 'page-personalinfo',
  templateUrl: 'personalinfo.html',
})
export class PersonalinfoPage {
users: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
                ];

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalinfoPage');
  }

  goToPerson(user) {
    this.navCtrl.push (PersonalPage, user);
  }
}
