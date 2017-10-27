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
  
  ionViewDidLoad(){
	this.initMap();
  }
  
  initMap(){
	let obj = this;
	let marker, i;
	let markers = [
        ['eaton center', 43.653982, -79.380319],
        ['York University', 43.7735, -79.5019]
    ];
	if (navigator.geolocation) 
	{
          navigator.geolocation.getCurrentPosition(function(position) 
		  {
			obj.MyLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			  
			const options = 
			{
				center: obj.MyLocation,
				zoom: 15
			};
	
			obj.map = new google.maps.Map(obj.mymap.nativeElement, options);
			obj.addMarker(obj.MyLocation, obj.map);
			let directionsService = new google.maps.DirectionsService;
			let directionsDisplay = new google.maps.DirectionsRenderer;
			
			for(i=0; i < markers.length; i++)
			{
				let position = new google.maps.LatLng(markers[i][1], markers[i][2]);
				marker = new google.maps.Marker({
					position: position,
					map: obj.map,
					title: markers[i][0]
				})
				google.maps.event.addListener(marker, 'click', (function (marker, i) 
				{
					return function() 
					{
						
						
						directionsDisplay.set('directions', null);
						directionsDisplay.setMap(obj.map);
						
						directionsService.route(
						{
						  origin: obj.MyLocation,
						  destination: marker.position,
						  travelMode: 'DRIVING'
						}, 
						function(response, status) 
						{
						  if (status === 'OK') 
						  {
							directionsDisplay.setDirections(response);
						  } 
						  else 
						  {
							window.alert('Directions request failed due to ' + status);
						  }
						});
					}
				})(marker, i));
			}
          }, function() {});
    } 
	else 
	{}
  }
  
  addMarker(position, map){
	  return new google.maps.Marker({
		position,
		map
	  });
  }
}
