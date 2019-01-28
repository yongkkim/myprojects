import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders} from  '@angular/common/http';
import { Observable, from} from 'rxjs';
import { map } from 'rxjs/operators';
import { Match } from './match';
import { Champ } from './champ';
import { Spell } from './spell';
import { Item } from './item';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})
export class SummonerHistoryService {

    private apiurl: string;
	
  constructor(private  http:  HttpClient) {}
  
  setURL(id: string){
	 this.apiurl = '/api/lol/match/v4/matchlists/by-account/' + id + '?beginIndex=0&endIndex=10&api_key=RGAPI-4115e284-e1a3-4ba0-85df-c27f14523444';
  }
  getdata(id: string): Observable<Match>
  {
    this.setURL(id);
    return this.http.get<Match>(this.apiurl, httpOptions).pipe(map((res) => res));
  }
  getimage(): Observable<Champ>
  {
	this.apiurl = '/dragon/cdn/9.2.1/data/en_US/champion.json';
	return this.http.get<Champ>(this.apiurl, httpOptions).pipe(map((res) => res));
  }
  getspell(): Observable<Spell>
  {
	this.apiurl = '/dragon/cdn/9.2.1/data/en_US/summoner.json';
	return this.http.get<Spell>(this.apiurl, httpOptions).pipe(map((res) => res));
  }
  getitem(): Observable<Item>
  {
    this.apiurl = '/dragon/cdn/9.2.1/data/en_US/item.json';
    return this.http.get<Item>(this.apiurl, httpOptions).pipe(map((res) => res));
  }
}
