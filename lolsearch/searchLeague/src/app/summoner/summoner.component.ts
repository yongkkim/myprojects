import { Component, OnInit, Input } from '@angular/core';
import { LOLUserData } from './lolinterface';
import { SummonerService } from './summoner.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-summoner',
  templateUrl: './summoner.component.html',
  providers: [ SummonerService ],
  styleUrls: ['./summoner.component.css']
})
export class SummonerComponent/*implements OnInit*/{

  private typed : boolean = false;
  private heroes: LOLUserData;
  private url: string = 'http://ddragon.leagueoflegends.com/cdn/8.15.1/img/profileicon/';
  private profileimg: string = "";
  constructor(private summonerService: SummonerService) {}
  
  getHeroes(name: string): void {
    this.summonerService.getdata(name)
	.pipe(debounceTime(500)).subscribe(hero => 
	{
		this.heroes = hero;
<<<<<<< HEAD
		this.heroes.profileimg = this.url + this.heroes.profileIconId + ".png";
=======
		this.profileimg = this.url + this.heroes.profileIconId + ".png";
>>>>>>> 5c7e29a9b614a085a2485b874a41a1db953dd689
	});
  }
  onEnter(value: string) {
	if(value.length != 0){
		this.typed = true;
		if(this.typed)
		{
			this.getHeroes(value);
		}
	}
  }
<<<<<<< HEAD
  backToDefault(){
	this.heroes = null;
  }
=======
>>>>>>> 5c7e29a9b614a085a2485b874a41a1db953dd689
}
