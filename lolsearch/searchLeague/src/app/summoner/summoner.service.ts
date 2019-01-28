import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders, HttpErrorResponse} from  '@angular/common/http';
import { Observable, from, throwError} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LOLUserData } from './lolinterface';
import { RankInfo } from './rankinfo';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};


@Injectable()
export class SummonerService {

  private apiurl: string;
  
  constructor(private  http:  HttpClient) {}
  
  setURL(name: string){
	 this.apiurl = '/api/lol/summoner/v4/summoners/by-name/' + name + '?api_key=RGAPI-4115e284-e1a3-4ba0-85df-c27f14523444';
  }
  setURL2(summonerID: string){
    this.apiurl = '/api/lol/league/v4/positions/by-summoner/' + summonerID + '?api_key=RGAPI-4115e284-e1a3-4ba0-85df-c27f14523444';
   }

  getdata(name: string): Observable<LOLUserData>{
  this.setURL(name);
  return this.http.get<LOLUserData>(this.apiurl, httpOptions).pipe(
    map(res => res),
    catchError(error => {return throwError(true);}));
  }

  getRankdata(summonerID: string): Observable<RankInfo>{
    this.setURL2(summonerID);
    return this.http.get<RankInfo>(this.apiurl, httpOptions).pipe(map(res => res));
  }
}
