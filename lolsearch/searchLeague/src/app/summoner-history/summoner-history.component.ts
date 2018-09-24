import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { SummonerHistoryService } from './summoner-history.service';
import { SummonerOnegameHistoryService } from '../summoner-onegame-history/summoner-onegame-history.service';
import { LOLUserData } from '../summoner/lolinterface';
import { Match } from './match';
import { Champ } from './champ';
import { Spell } from './Spell';
import { Player } from '../summoner-onegame-history/player';
import { trigger, state, style, transition,	animate, group, query, stagger, keyframes
} from '@angular/animations';
import { Spells } from './spells';

@Component({
  selector: 'app-summoner-history',
  templateUrl: './summoner-history.component.html',
	styleUrls: ['./summoner-history.component.css'],
	animations:[
		trigger('toggle', [
			state('open', style({
				'opacity' : '1',
				'display' : 'block' 
			})),
			state('close', style({
				'opacity' : '0',
				'display' : 'none'
			})),
			transition('open => close', animate('1000ms ease-in-out', style({
				'opacity':'0',
				'display' : 'none'
			}))),
			transition('close => open', animate('1000ms ease-in-out', style({
				'opacity':'1',
				'display' : 'block'
			})))
		])
	]
})
export class SummonerHistoryComponent implements OnInit{

  private champimages: Champ;
	private images: Array<string[]> = [];
	private memberimages: Array<Array<string[]>> = [];
	private players: Player[];
	private url: string = 'http://ddragon.leagueoflegends.com/cdn/8.15.1/img/champion/';
	private spellurl: string = 'http://ddragon.leagueoflegends.com/cdn/8.15.1/img/spell/';
	private spell: Spell;
  	private keys= new Map();
	private history: Match;
	private clicked: Array<string[]> = [];
  	@Input('userinfo') private info: LOLUserData;
  
  constructor(private summonerHistoryService: SummonerHistoryService, private summonerOneGameHistoryService: SummonerOnegameHistoryService) {}
  
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
				let i: string[] = [];
				let imgurl = this.url + this.keys.get((ig.champion).toString());
				i.push(imgurl);
				i.push((ig.gameId).toString());
				this.images.push(i);			
			});
			this.summonerHistoryService.getspell()
			.subscribe((spl) =>{
				this.spell = spl;
			});
			this.summonerOneGameHistoryService.getdata(this.history)
			.subscribe((play) => {
				this.players = play;
				this.players.forEach(player => {
					let temp: Array<any[]> = [];
					
					player.participants.forEach(igs => {
					let temp2: any[] = [];
					let imgurl = this.url + this.history.champlist.get((igs.championId).toString());
					temp2.push(imgurl);
					
						for(let c of Object.values(this.spell.data))
						{
							if(igs.spell1Id.toString() == c.key)
							{
								c.spellurl = this.spellurl + c.image.full;
								temp2.push(c);
								break;
							}
						}
						for(let c of Object.values(this.spell.data))
						{
							if(igs.spell2Id.toString() == c.key)
							{
								c.spellurl = this.spellurl + c.image.full;
								temp2.push(c);
								break;
							}
						}
						temp.push(temp2);
					});
					let gameid: string[] = []
					gameid.push((player.gameId).toString())
					temp.push(gameid);
					this.memberimages.push(temp);
				});
			});
		});
	});
	}
	
  findHistory(){
		this.getHistory(this.info.accountId.toString());
	}

	toggle(gid : string, n: string){//where n is order number of li tag
				let div = document.getElementById(n);
				let btn = document.getElementById(gid);
				if(div.getAttribute("value") == "yes")
				{
					div.style.display = "none";
					div.setAttribute("value", "no");
					btn.blur();
				}
				else
				{
					div.style.display = "block";
					div.setAttribute("value", "yes");
					btn.scrollIntoView();
				}
	}
	data(gid : string) : Array<string[]>
	{
		this.memberimages.forEach((item, index) =>{
			item.forEach((i, index) => {
				if(i[i.length-1] == gid){
					this.clicked = item;
					index = item.length;
				}
			});
				index = this.memberimages.length;
		});

		return this.clicked;
	}
	pop(desc: string, event){
		//let target = event.srcElement.attributes.id || event.currentTarget.id;
		let ds = document.getElementById("desc");
		let z = document.getElementById(event.target.id);
		let pos = z.getBoundingClientRect();
		let newpos = "translate(" + event.screenX + "px, " + event.screenY + "px)";
		console.log(newpos);
		ds.style.display = "block";
		ds.innerHTML = desc;
		ds.style.transform = newpos;
	}
	out(){
		let ds = document.getElementById("desc");
		ds.style.display = "none";
	}
}
