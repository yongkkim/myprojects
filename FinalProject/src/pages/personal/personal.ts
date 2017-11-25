import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { MapPage } from '../map/map';
import * as moment from 'moment';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;
/**
 * Generated class for the PersonalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-personal',
  templateUrl: 'personal.html',
})
export class PersonalPage {

   eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
 
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };


  public person: any;
	public rate: number;
	@ViewChild('map') mapElement: ElementRef;
 	map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private alertCtrl: AlertController) {
  		this.person = navParams.data; //Gets the person object

  }

  onModelChange(value) {

 	this.rate = value;

  }

    ionViewDidLoad(){
    this.loadMap();
    this.addMarker();
  }
 
  loadMap(){
 
    let latLng = new google.maps.LatLng( 43.7735, -79.5019);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
  }

   goToMap()
  {
  this.navCtrl.push(MapPage);
  }

 addEvent() {
    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;
 
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);
 
        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });
      }
    });
  }
 
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
  onEventSelected(event) {
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');
    
    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: 'From: ' + start + '<br>To: ' + end,
      buttons: ['OK']
    })
    alert.present();
  }
 
  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }
  addMarker(){
 
  let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
  });
 
  let content = "<h4>Information!</h4>";          
 
  this.addInfoWindow(marker, content);
 
}

addInfoWindow(marker, content){
 
  let infoWindow = new google.maps.InfoWindow({
    content: content
  });
 
  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });
 
}

}
