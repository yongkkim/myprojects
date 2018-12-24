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
import { environment } from '../../environments/environment';


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
	private deviceType : string;
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
						kda = igs.stats.kills.toString() + "/" + igs.stats.assists.toString() + "/" 
						+ igs.stats.deaths.toString();
						temp2.push(kda);
						temp2.push(((igs.stats.kills + igs.stats.assists) / igs.stats.deaths).toFixed(2) + ":1 KDA");
						//minions
						temp2.push(igs.stats.totalMinionsKilled);
						//money earned
						temp2.push((igs.stats.goldEarned / 1000).toFixed(1) + "k");
						temp.push(temp2);
						if(acid == this.info.accountId)
						{
							temp2.push(player.gameMode);
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

	toggle(gid : string, n: string, event){//where n is order number of li tag
		if(this.deviceType == "smartphone" && (event.target.tagName == "BUTTON" || event.target.tagName == "I"))
		{
			event.stopPropagation();	
			let div = document.getElementById(n);
			if(div.getAttribute("value") == "yes")
			{
				div.style.display = "none";
				div.setAttribute("value", "no");
			}
			else
			{
				div.style.display = "block";
				div.setAttribute("value", "yes");
			}
		}
		else if(this.deviceType == "desktop")
		{
			let div = document.getElementById(n);
			let li = document.getElementById(gid);
			if(div.getAttribute("value") == "yes")
			{
				div.style.display = "none";
				div.setAttribute("value", "no");
				li.blur();
			}
			else
			{
				div.style.display = "block";
				div.setAttribute("value", "yes");
				li.scrollIntoView();
			}
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
		newdiv.id = "desc";
		let newimg = document.createElement('img');
		newimg.src = img;
		let newtext = document.createElement('p');
		newtext.id = "text";
		let pos = event.target.getBoundingClientRect();
		let newpos;
		

		if( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			newdiv.setAttribute("style", 
		"position: fixed; height:auto; width: 150px; background-color: #3B3B3B; color: white; z-index: 10; border-radius: 5px; padding: 5px; opacity: 0.9;");
		newtext.setAttribute("style", "padding: 0; margin: 0; font-size: 2px;");
		newimg.setAttribute("style", "height: 30px; width: 30px;");
		}
		/*else if( /iPad/i.test(navigator.userAgent) ) {
			newdiv.setAttribute("style", 
		"position: absolute; height:auto; width: 175px; background-color: #3B3B3B; color: white; z-index: 10; border-radius: 5px; padding: 5px; opacity: 0.9;");
		newtext.setAttribute("style", "padding: 0; margin: 0; font-size: 7px;");
		newimg.setAttribute("style", "height: 40px; width: 40px;");
		}
		else if(window.innerWidth >= 720 && window.innerWidth <= 1024) 
		{
			newdiv.setAttribute("style", 
		"position: absolute; height:auto; width: 200px; background-color: #3B3B3B; color: white; z-index: 10; border-radius: 5px; padding: 5px; opacity: 0.9;");
		newtext.setAttribute("style", "padding: 0; margin: 0; font-size: 9px;");
		newimg.setAttribute("style", "height: 50px; width: 50px;");
		}*/
		else{
			newdiv.setAttribute("style", 
		"position: fixed; height:auto; width: 225px; background-color: #3B3B3B; color: white; z-index: 10; border-radius: 5px; padding: 5px; opacity: 0.9;");
		newtext.setAttribute("style", "padding: 0; margin: 0; font-size: 11px;");
		}
			if(half != -2){
				newdiv.appendChild(newimg);
			}
			newtext.innerHTML = desc;
			newdiv.appendChild(newtext);
			event.target.parentElement.appendChild(newdiv);
			newdiv.style.display = "block";
			newpos = this.setdivpos(half, event.target.className, pos.width, pos.top, pos.bottom);
			newdiv.style.transform = newpos;
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
	setdivpos(th: number, cname: string, width: number, targettop: number, targetbot: number) : string //prevent popup window from going out of a page
	{
		let pop = document.getElementById("desc");
		let poptext = document.getElementById("text");
		let poppos = pop.getBoundingClientRect();
		let pos: string = "";

		if( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			if(th == -2)
			{
				pop.style.top = (targetbot - 30) + "px";
				poptext.style.fontSize = "10px";
				poptext.style.textAlign = "center";
				pop.style.width = "70px";
				pop.style.padding = "3px";
				
			}
			else if(th == -1)
			{
				pop.style.width = "130px";
				if((targetbot + poppos.height) > window.innerHeight - 80){
					let newtop = targettop - (poppos.height + 5);
					pop.style.top = newtop.toString() + "px";
					pos = "translateX("+ width + "px)";	
				}
				else{
					pop.style.top = targetbot.toString() + "px";
					pos = "translateX("+ width + "px)";
				}		
			}
			else
			{
				if((targetbot + poppos.height) > window.innerHeight - 80){
					let newtop = targettop - (poppos.height + 5);
					pop.style.top = newtop.toString() + "px";
					pos = "translateX("+ width + "px)";	
				}
				else{
					pop.style.top = targetbot.toString() + "px";
					pos = "translateX("+ width + "px)";
				}
			}
		}
		else{        //Desktop
			if(th == -2)
			{
				pop.style.top = (targetbot - 50) + "px";
				poptext.style.fontSize = "15px";
				poptext.style.textAlign = "center";
				pop.style.width = "100px";
				pop.style.padding = "6px";
			}
			else
			{
				if((targetbot + poppos.height) > window.innerHeight - 80){
					let newtop = targettop - (poppos.height + 5);
					pop.style.top = newtop.toString() + "px";
					pos = "translateX("+ width + "px)";	
				}
				else{
					if(cname == "spellimg"){
						pop.style.top = targettop.toString() + "px";
					}
					else if(cname == "item ng-tns-c2-0 ng-star-inserted"){
						pop.style.top = targetbot.toString() + "px";
					}
					pos = "translateX("+ width + "px)";
				}
			}
		}
		return pos;
	}
	findtype() : boolean {
		if( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			this.deviceType = "smartphone";
			return true;
		}
		else{
			this.deviceType = "desktop";
			return false;
		}
	}
}
