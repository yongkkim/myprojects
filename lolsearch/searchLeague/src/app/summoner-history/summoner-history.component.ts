import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { SummonerHistoryService } from './summoner-history.service';
import { SummonerOnegameHistoryService } from '../summoner-onegame-history/summoner-onegame-history.service';
import { LOLUserData } from '../summoner/lolinterface';
import { Match } from './match';
import { Champ } from './champ';
import { Spell } from './Spell';
import { Player } from '../summoner-onegame-history/player';
import { trigger, state, style, transition,	animate, group, query, stagger, keyframes
} from '@angular/animations';
import { Item } from './item';
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
	private images: Array<any[]> = [];
	private memberimages: Array<Array<string[]>> = [];
	private players: Player[];
	private url: string = 'http://ddragon.leagueoflegends.com/cdn/8.19.1/img/champion/';
	private spellurl: string = 'http://ddragon.leagueoflegends.com/cdn/8.19.1/img/spell/';
	private itemurl: string = 'http://ddragon.leagueoflegends.com/cdn/8.19.1/img/item/';
	private itemicon: string = 'http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/items.png';
	private goldicon: string = 'http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/gold.png';
	private kdaicon: string = 'http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/score.png';
	private champicon: string = 'http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/champion.png';
	private minionicon: string = 'http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/minion.png';
	private spellicon: string = 'http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/spells.png';
	private spell: Spell;
	private item: Item;
  	private keys= new Map();
	private history: Match;
	private clicked: Array<string[]> = [];
	private initialhis : Array<string[]> = [];
  	@Input('userinfo') private info: LOLUserData;
  
  constructor(private elementRef:ElementRef, private summonerHistoryService: SummonerHistoryService, private summonerOneGameHistoryService: SummonerOnegameHistoryService) {}
  
  ngOnInit(){
	if(this.info != null){
		this.findHistory();
	}
  }

  getHistory(id: string): void {
	this.summonerHistoryService.getitem().subscribe((im) =>{
		this.item = im;
	});
	this.summonerHistoryService.getspell().subscribe((spl) =>{
		this.spell = spl;
	});
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
				let i: any[] = [];
				let imgurl = this.url + this.keys.get((ig.champion).toString());
				i.push(imgurl);
				i.push(ig.gameId);
				this.images.push(i);			
			});
			this.summonerOneGameHistoryService.getdata(this.history)
			.subscribe((play) => {
				this.players = play;
				this.players.forEach(player => {
					let accid: number[] = [];
					let temp: Array<any[]> = [];
					let me: any[] = [];
					let timetaken: number = player.gameDuration;
					player.participantIdentities.forEach(first=>{
						accid.push(first.player.accountId);
					})
					player.participants.forEach((igs, index) => {
						//for each player's champ, spells, items, kda, total money earned, total minions killed
						let acid = accid[index];
						let temp2: any[] = [];
						let kda: string = "";
						let iturl: string[] = [];
						let imgurl = this.url + this.history.champlist.get((igs.championId).toString());
						temp2.push(imgurl);
						//spells
						temp2.push(this.findspell(igs.spell1Id));
						temp2.push(this.findspell(igs.spell2Id));
						//items
						temp2.push(this.finditem(igs.stats.item0));
						temp2.push(this.finditem(igs.stats.item1));
						temp2.push(this.finditem(igs.stats.item2));
						temp2.push(this.finditem(igs.stats.item3));
						temp2.push(this.finditem(igs.stats.item4));
						temp2.push(this.finditem(igs.stats.item5));
						temp2.push(this.finditem(igs.stats.item6));
						//kda
						kda = igs.stats.kills.toString() + "/" + igs.stats.assists.toString() + "/" + igs.stats.deaths.toString();
						temp2.push(kda);
						//minions
						temp2.push(igs.stats.totalMinionsKilled);
						//money earned
						temp2.push(igs.stats.goldEarned);
						temp.push(temp2);
						if(acid == this.info.accountId)
						{
							me = temp2;
						}
						//this.initialhis.push(temp2);

					});
					//add info to initialhis for list of history
					this.initialhis.push(me);
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
	pop(half: number, img: string, desc: string, event){
		let newdiv = document.createElement('div');
		let newimg = document.createElement('img');
		let newtext = document.createElement('p');
		let pos = event.target.getBoundingClientRect();
		let newpos;
		newimg.src = img;

		if( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			newdiv.setAttribute("style", 
		"position: absolute; height:auto; width: 130px; background-color: #3B3B3B; color: white; z-index: 10; display: block; border-radius: 5px; padding: 5px; opacity: 0.9;");
		newtext.setAttribute("style", "padding: 0; margin: 0; font-size: 4px;");
		newimg.setAttribute("style", "height: 40px; width: 40px;");
		}
		else if( /iPad/i.test(navigator.userAgent) ) {
			newdiv.setAttribute("style", 
		"position: absolute; height:auto; width: 175px; background-color: #3B3B3B; color: white; z-index: 10; display: block; border-radius: 5px; padding: 5px; opacity: 0.9;");
		newtext.setAttribute("style", "padding: 0; margin: 0; font-size: 7px;");
		newimg.setAttribute("style", "height: 40px; width: 40px;");
		}
		else if(window.innerWidth >= 720 && window.innerWidth <= 1024) 
		{
			newdiv.setAttribute("style", 
		"position: absolute; height:auto; width: 200px; background-color: #3B3B3B; color: white; z-index: 10; display: block; border-radius: 5px; padding: 5px; opacity: 0.9;");
		newtext.setAttribute("style", "padding: 0; margin: 0; font-size: 9px;");
		newimg.setAttribute("style", "height: 50px; width: 50px;");
		}
		else{
			newdiv.setAttribute("style", 
		"position: absolute; height:auto; width: 225px; background-color: #3B3B3B; color: white; z-index: 10; display: block; border-radius: 5px; padding: 5px; opacity: 0.9;");
		newtext.setAttribute("style", "padding: 0; margin: 0; font-size: 11px;");
		}

			newpos = this.setdivpos(half, event.target.parentNode.className, pos.width);

			newdiv.style.transform = newpos;
			newdiv.id = "desc";
			newdiv.appendChild(newimg);
			newtext.innerHTML = desc;
			newdiv.appendChild(newtext);
			event.target.parentElement.appendChild(newdiv);
	}
	out(){
		let selected = document.getElementById("desc");
        selected.parentNode.removeChild(selected);
	}
	findspell(spellid: number) : Spells{
		
		for(let c of Object.values(this.spell.data))
		{
			if(spellid.toString() == c.key)
			{
				c.spellurl = this.spellurl + c.image.full;
				return c;
			}
		}
	}
	finditem(itemnum: number): any{
	
		if(itemnum != 0)
		{
			this.item.data[itemnum].itemsrc = this.itemurl + this.item.data[itemnum].image.full;
			return this.item.data[itemnum];
		}
		else if(itemnum == 0)
		{
			return "nothing";
		}
	}
	setdivpos(th: number, cname: string, width: number) : string
	{
		let pos: string = "";
		if( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			if(th == -1)
			{
				pos = "translate("+ (width + 30) + "px, " + -(document.querySelector(".btnonehistory").clientHeight -10) +"px)";
			}
			else if(th < 5)
			{
				if(cname == "spell")
				{
					pos = "translate("+ (width + 30) + "px, " + -(document.querySelector(".champ").clientHeight) +"px)";
				}
				if(cname == "items")
				{
					pos = "translate("+ (width + 60) + "px, " + -(document.querySelector(".champ").clientHeight-20) +"px)";
				}
			}
			else if(th >= 5 || th < 10)
			{
				if(cname == "spell")
				{
					pos = "translate("+ -155 + "px, " + -(document.querySelector(".champ").clientHeight-10) +"px)";
				}
				if(cname == "items")
				{
					pos = "translate("+ -175 + "px, " + -(document.querySelector(".champ").clientHeight-20) +"px)";
				}
			}
		}
		else if(/iPad/i.test(navigator.userAgent) ) {
			if(th == -1)
			{
				pos = "translate("+ (width + 30) + "px, " + -(document.querySelector(".btnonehistory").clientHeight -10) +"px)";
			}
			else if(th < 5)
			{
				if(cname == "spell")
				{
					pos = "translate("+ (width + 10) + "px, " + -(document.querySelector(".champ").clientHeight-20) +"px)";
				}
				if(cname == "items")
				{
					pos = "translate("+ (width + 80) + "px, " + -(document.querySelector(".champ").clientHeight-40) +"px)";
				}
			}
			else if(th >= 5 || th < 10)
			{
				if(cname == "spell")
				{
					pos = "translate("+ -190 + "px, " + -(document.querySelector(".champ").clientHeight-20) +"px)";
				}
				if(cname == "items")
				{
					pos = "translate("+ -210 + "px, " + -(document.querySelector(".champ").clientHeight-40) +"px)";
				}
			}
		}
		else if(window.innerWidth >= 720 && window.innerWidth <= 1024) 
		{
			if(th == -1)
			{
				pos = "translate("+ (width + 30) + "px, " + -(document.querySelector(".btnonehistory").clientHeight -10) +"px)";
			}
			else if(th < 5)
			{
				if(cname == "spell")
				{
					pos = "translate("+ (width + 30) + "px, " + -(document.querySelector(".champ").clientHeight-20) +"px)";
				}
				if(cname == "items")
				{
					pos = "translate("+ (width + 90) + "px, " + -(document.querySelector(".champ").clientHeight-40) +"px)";
				}
			}
			else if(th >= 5 || th < 10)
			{
				if(cname == "spell")
				{
					pos = "translate("+ -260 + "px, " + -(document.querySelector(".champ").clientHeight-20) +"px)";
				}
				if(cname == "items")
				{
					pos = "translate("+ -280 + "px, " + -(document.querySelector(".champ").clientHeight-40) +"px)";
				}
			}
		}
		else{
			if(th == -1)
			{
				pos = "translate("+ (width + 30) + "px, " + -(document.querySelector(".btnonehistory").clientHeight) +"px)";
			}
			else if(cname == "spell")
			{
				pos = "translate("+ (width + 50) + "px, " + -(document.querySelector(".champ").clientHeight-30) +"px)";
			}
			if(cname == "items")
			{
				pos = "translate("+ (width + 130) + "px, " + -(document.querySelector(".champ").clientHeight-60) +"px)";
			}
		}
		return pos;
	}
	setbtimg(img: string) {
		const styles = {'background-image' : img};
		return styles;
	}	
}
