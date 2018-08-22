import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from  '@angular/common/http';
import { Observable, from, forkJoin} from 'rxjs';
import { map, debounce } from 'rxjs/operators';
import { TopTwoTier } from './toptwotier';
import { TopTwoTiers } from './toptwotiers';
import { LOLUserData } from '../summoner/lolinterface';
import { Match } from '../summoner-history/match';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ChampionStatsService {

  private apiurl: string;

  constructor(private http : HttpClient) { }

  setURL1(name: string){
    this.apiurl = '/api/lol/summoner/v3/summoners/by-name/' + name + '?api_key=RGAPI-cf0256aa-b524-4a91-9134-3d3404565252';
   }
   setURL2(name: string){
    this.apiurl = '/api/lol/match/v3/matchlists/by-account/' + name + '?api_key=RGAPI-cf0256aa-b524-4a91-9134-3d3404565252';
  }
   
   getdata(ttt: TopTwoTiers): Observable<LOLUserData>
   {
      //let observableGroup = [];
      this.setURL1(ttt.playerOrTeamName);
      return this.http.get<LOLUserData>(this.apiurl, httpOptions).pipe(map((res) => res));
   }

   getchamp(accid: LOLUserData[]): Observable<Match[]>
   {
     let observableGroup = [];
 
     accid.forEach((ig) => {
     this.setURL2((ig.accountId).toString());
     observableGroup.push(this.http.get<Match>(this.apiurl, httpOptions).pipe(map((res) => res)));
     });
 
     return forkJoin(observableGroup);
   }

   getChallenger(): Observable<TopTwoTier>
   {
     this.apiurl = '/api/lol/league/v3/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=RGAPI-cf0256aa-b524-4a91-9134-3d3404565252';
     return this.http.get<TopTwoTier>(this.apiurl, httpOptions).pipe(map(res => res));
   }
    
   getMaster(): Observable<TopTwoTier>
   {
     this.apiurl = '/api/lol/league/v3/masterleagues/by-queue/RANKED_SOLO_5x5?api_key=RGAPI-cf0256aa-b524-4a91-9134-3d3404565252';
     return this.http.get<TopTwoTier>(this.apiurl, httpOptions).pipe(map(res => res));
   }
}
