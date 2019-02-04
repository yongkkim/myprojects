import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from  '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LOLUserData } from './lolinterface';
import { RankInfo } from './rankinfo';
import { environment } from 'src/environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    'Content-Type':  'application/json'
  })
};


@Injectable()
export class SummonerService {

  private apiurl: string;
  baseApiUrl = environment.baseApiUrl;
  baseDragonUrl = environment.baseDragonUrl;

  constructor(private  http:  HttpClient) {}
  
  setURL(name: string){
    this.apiurl = 'https://cors-anywhere.herokuapp.com/' + this.baseApiUrl + '/lol/summoner/v4/summoners/by-name/' + name + '?api_key=RGAPI-5bcb897d-cab7-4e7d-90f0-1e3e970ef14e';
	  //this.apiurl = '/api/lol/summoner/v4/summoners/by-name/' + name + '?api_key=RGAPI-5bcb897d-cab7-4e7d-90f0-1e3e970ef14e';
  }
  setURL2(summonerID: string){
    this.apiurl = 'https://cors-anywhere.herokuapp.com/' + this.baseApiUrl + '/lol/league/v4/positions/by-summoner/' + summonerID + '?api_key=RGAPI-5bcb897d-cab7-4e7d-90f0-1e3e970ef14e';
    //this.apiurl = '/api/lol/league/v4/positions/by-summoner/' + summonerID + '?api_key=RGAPI-5bcb897d-cab7-4e7d-90f0-1e3e970ef14e';
   }

  getdata(name: string): Observable<LOLUserData>{
  this.setURL(name);
  return this.http.get<LOLUserData>(this.apiurl, {headers: httpOptions.headers}).pipe(
    map(res => res),
    catchError(error => {return throwError(true);}));
  }

  getRankdata(summonerID: string): Observable<RankInfo>{
    this.setURL2(summonerID);

    return this.http.get<RankInfo>(this.apiurl, {headers: httpOptions.headers}).pipe(map(res => res));
  }
}