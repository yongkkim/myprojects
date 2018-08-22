import { Component, OnInit } from '@angular/core';
import { LOLUserData } from '../summoner/lolinterface';
import { SummonerService } from '../summoner/summoner.service';
import { ChampionStatsService } from './champion-stats.service';
import { TopTwoTier } from './toptwotier';
import { Champ } from '../summoner-history/champ';
import { SummonerHistoryService } from '../summoner-history/summoner-history.service';
import { interval } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-champion-stats',
  templateUrl: './champion-stats.component.html',
  styleUrls: ['./champion-stats.component.css']
})
export class ChampionStatsComponent implements OnInit {
  private heroes: LOLUserData;
  private url: string = 'http://ddragon.leagueoflegends.com/cdn/8.15.1/img/profileicon/';
  private profileimg: string = "";
  private challenger : TopTwoTier;
  private master : TopTwoTier;
  private players = new Array<LOLUserData>(); 
  private keys= new Map();
  private champimages: Champ;
  private interval = interval(5000);

  constructor(private summonerService: SummonerService, private championstatsservice : ChampionStatsService, private summonerHistoryService: SummonerHistoryService) { }

  ngOnInit() {
    this.championstatsservice.getChallenger().subscribe(challdata => {
        this.challenger = challdata;
        this.challenger.entries.forEach(c => {
          this.interval.subscribe(() => this.championstatsservice.getdata(c).subscribe(challs => {
            this.players.push(challs);
            console.log(challs); 
        }));
      });
            /*this.championstatsservice.getchamp(this.players).subscribe(matches =>{
              console.log(matches);
              this.summonerHistoryService.getimage().subscribe(champsinfo => {
                for(let c of Object.values(champsinfo.data))
                {
                  this.keys.set(c.key, [new Map().set("name", c.name), new Map().set("image", c.image.full), new Map().set("frequency", 0)]);
                }
                console.log(this.keys);
                matches.forEach(m =>{
                  m.matches.forEach(ms =>{
                    let record = this.keys.get((ms.champion).toString);
                    record.set("frequency", record.get("frequency") + 1);
                  })
                });
              });
            });
        });*/
    });
    /*this.championstatsservice.getMaster().subscribe(mastdata => {
      this.master = mastdata;
    });*/
  }

}
