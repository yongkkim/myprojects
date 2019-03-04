import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders} from  '@angular/common/http';
import { Observable, from} from 'rxjs';
import { map } from 'rxjs/operators';
import { Match } from './match';
import { Champ } from './champ';
import { Spell } from './spell';
import { Item } from './item';
import { environment } from 'src/environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SummonerHistoryService {

    private apiurl: string;
	  baseApiUrl = environment.baseApiUrl;
    baseDragonUrl = environment.baseDragonUrl;
  constructor(private  http:  HttpClient) {}
  
  setURL(id: string){
   //this.apiurl = '/api/lol/match/v4/matchlists/by-account/' + id + '?beginIndex=0&endIndex=10&api_key=RGAPI-373b918a-cea9-4621-9184-f4e56d7789a5';
   this.apiurl = 'https://cors-anywhere.herokuapp.com/' + this.baseApiUrl + '/lol/match/v4/matchlists/by-account/' + id + '?beginIndex=0&endIndex=20&api_key=RGAPI-373b918a-cea9-4621-9184-f4e56d7789a5';
  }
  getdata(id: string): Observable<Match>
  {
    this.setURL(id);
    return this.http.get<Match>(this.apiurl, httpOptions).pipe(map((res) => res));
  }
  getimage(): Observable<Champ>
  {
	this.apiurl = 'https://cors-anywhere.herokuapp.com/' + this.baseDragonUrl + '/cdn/9.3.1/data/en_US/champion.json';
	return this.http.get<Champ>(this.apiurl, httpOptions).pipe(map((res) => res));
  }
  getspell(): Observable<Spell>
  {
	this.apiurl = 'https://cors-anywhere.herokuapp.com/' + this.baseDragonUrl + '/cdn/9.3.1/data/en_US/summoner.json';
	return this.http.get<Spell>(this.apiurl, httpOptions).pipe(map((res) => res));
  }
  getitem(): Observable<Item>
  {
    this.apiurl = 'https://cors-anywhere.herokuapp.com/' + this.baseDragonUrl + '/cdn/9.3.1/data/en_US/item.json';
    return this.http.get<Item>(this.apiurl, httpOptions).pipe(map((res) => res));
  }
}
