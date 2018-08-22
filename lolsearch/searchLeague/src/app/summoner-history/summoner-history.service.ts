import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders} from  '@angular/common/http';
import { Observable, from} from 'rxjs';
import { map } from 'rxjs/operators';
import { Match } from './match';
import { Champ } from './champ';

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
	 this.apiurl = '/api/lol/match/v3/matchlists/by-account/' + id + '?beginIndex=0&endIndex=5&api_key=RGAPI-cf0256aa-b524-4a91-9134-3d3404565252';
  }
  
  getdata(id: string): Observable<Match>
  {
	this.setURL(id);
	return this.http.get<Match>(this.apiurl, httpOptions).pipe(map((res) => res));
  }
  getimage(): Observable<Champ>
  {
	this.apiurl = '/dragon/cdn/8.15.1/data/en_US/champion.json';
	return this.http.get<Champ>(this.apiurl, httpOptions).pipe(map((res) => res));
  }
}
