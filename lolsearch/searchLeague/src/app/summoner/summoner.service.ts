import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders, HttpErrorResponse} from  '@angular/common/http';
import { Observable, from, throwError} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LOLUserData } from './lolinterface';
import { RankInfo } from './rankinfo';
import { environment } from '../../environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};


@Injectable()
export class SummonerService {

  private apiurl: string;
  baseApiUrl: string = environment.baseApiUrl;
  baseDragonUrl: string = environment.baseDragonUrl;

  constructor(private  http:  HttpClient) {}
  
  setURL(name: string){
    this.apiurl = '/lolsearch' + this.baseApiUrl + '/lol/summoner/v4/summoners/by-name/' + name + '?api_key=RGAPI-1ad94f40-c57d-4586-8cb9-01a6ace0c9a7';
	  //this.apiurl = '/api/lol/summoner/v4/summoners/by-name/' + name + '?api_key=RGAPI-1ad94f40-c57d-4586-8cb9-01a6ace0c9a7';
  }
  setURL2(summonerID: string){
    this.apiurl = '/lolsearch' + this.baseApiUrl + 'lol/league/v4/positions/by-summoner/' + summonerID + '?api_key=RGAPI-1ad94f40-c57d-4586-8cb9-01a6ace0c9a7';
    //this.apiurl = '/api/lol/league/v4/positions/by-summoner/' + summonerID + '?api_key=RGAPI-1ad94f40-c57d-4586-8cb9-01a6ace0c9a7';
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
