import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	@ViewChild('map') mymap: ElementRef;
	map: any;
	Destination: any = '';
	MyLocation: any;
	
  constructor(public navCtrl: NavController) {

  }
  
  calculateAndDisplayRoute() {
		let copy = this
		let directionsService = new google.maps.DirectionsService;
		let directionsDisplay = new google.maps.DirectionsRenderer;
        const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: {lat: 41.85, lng: -87.65}
        });
		
        directionsDisplay.setMap(map);

		 if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            let pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
			copy.MyLocation = new google.maps.LatLng(pos)
          }, function() {
          });
        } else {
        }
		
		directionsService.route({
			  origin: copy.MyLocation,
			  destination: copy.Destination,
			  travelMode: 'DRIVING'
			}, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
          }
        });
	  }
	  
}
