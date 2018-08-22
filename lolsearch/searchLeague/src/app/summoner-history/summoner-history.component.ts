import { Component, OnInit, Input } from '@angular/core';
import { SummonerHistoryService } from './summoner-history.service';
import { LOLUserData } from '../summoner/lolinterface';
import { Match } from './match';
import { Matches } from './matches';
import { Champ } from './champ';

@Component({
  selector: 'app-summoner-history',
  templateUrl: './summoner-history.component.html',
  styleUrls: ['./summoner-history.component.css']
})
export class SummonerHistoryComponent implements OnInit{

  private champimages: Champ;
  private images: string[] = [];
  private url: string = 'http://ddragon.leagueoflegends.com/cdn/8.15.1/img/champion/';
  private keys= new Map();
  private typed : boolean = false;
  private history: Match;
  @Input('userinfo') private info: LOLUserData;
  
  constructor(private summonerHistoryService: SummonerHistoryService) {}
  
  ngOnInit(){
	if(this.info != null){
		this.findHistory();
	}
  }
  
  getHistory(id: string): void {
    this.summonerHistoryService.getdata(id)
	.subscribe((his) => {
		this.history = his;
		this.summonerHistoryService.getimage()
		.subscribe(img => 
		{
			this.champimages = img;
			for(let c of Object.values(this.champimages.data))
			{
				this.keys.set(c.key, c.image.full);
			}
			this.history.champlist = this.keys;
			this.history.matches.forEach(ig => {
				let imgurl = this.url + this.keys.get((ig.champion).toString());
				this.images.push(imgurl);				
			});
		});
	});
	}
	
  findHistory(){
		this.getHistory(this.info.accountId.toString());
  }
}
