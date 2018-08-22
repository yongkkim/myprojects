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
		this.heroes.profileimg = this.url + this.heroes.profileIconId + ".png";
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
  backToDefault(){
	this.heroes = null;
  }
}
