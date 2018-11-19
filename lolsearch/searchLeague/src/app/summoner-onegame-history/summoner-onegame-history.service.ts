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
	 this.apiurl = "/api/lol/match/v3/matches/" + gameid + "?api_key=RGAPI-51f2f85c-6070-40a6-8472-4533a57954aa";
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
