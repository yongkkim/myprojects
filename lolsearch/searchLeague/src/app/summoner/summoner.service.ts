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
  baseApiUrl = environment.baseApiUrl;
  baseDragonUrl = environment.baseDragonUrl;

  constructor(private  http:  HttpClient) {}
  
  setURL(name: string){
    this.apiurl = this.baseApiUrl + '/lol/summoner/v4/summoners/by-name/' + name + '?api_key=RGAPI-ea0b3ae8-d98b-45c6-adaa-f473fb3d3dc8';
	  //this.apiurl = '/api/lol/summoner/v4/summoners/by-name/' + name + '?api_key=RGAPI-ea0b3ae8-d98b-45c6-adaa-f473fb3d3dc8';
  }
  setURL2(summonerID: string){
    this.apiurl = this.baseApiUrl + '/lol/league/v4/positions/by-summoner/' + summonerID + '?api_key=RGAPI-ea0b3ae8-d98b-45c6-adaa-f473fb3d3dc8';
    //this.apiurl = '/api/lol/league/v4/positions/by-summoner/' + summonerID + '?api_key=RGAPI-ea0b3ae8-d98b-45c6-adaa-f473fb3d3dc8';
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
