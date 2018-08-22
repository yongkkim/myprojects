import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders} from  '@angular/common/http';
import { Observable, from, forkJoin} from 'rxjs';
import { map } from 'rxjs/operators';
import { Champ } from '../summoner-history/champ';
import { Player } from './player';
import { Match } from '../summoner-history/match';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class SummonerOnegameHistoryService {

  private apiurl: string;

  constructor(private  http:  HttpClient) { }

  setURL(gameid: string)
  {
<<<<<<< HEAD
	 this.apiurl = "/api/lol/match/v3/matches/" + gameid + "?api_key=RGAPI-cf0256aa-b524-4a91-9134-3d3404565252";
=======
	 this.apiurl = "/api/lol/match/v3/matches/" + gameid + "?api_key=RGAPI-e25b43b3-57a5-4b51-a6e3-2fddca5f7bd9";
>>>>>>> 5c7e29a9b614a085a2485b874a41a1db953dd689
  }
  
  getdata(match: Match): Observable<Player[]>
  {
	  let observableGroup = [];

	  match.matches.forEach((ig) => {
		this.setURL((ig.gameId).toString());
		observableGroup.push(this.http.get<Player>(this.apiurl, httpOptions).pipe(map((res) => res)));
	  });

	  return forkJoin(observableGroup);
  }
}
