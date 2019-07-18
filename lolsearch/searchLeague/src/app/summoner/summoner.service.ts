import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { LOLUserData } from "./lolinterface";
import { RankInfo } from "./rankinfo";
import { environment } from "src/environments/environment.prod";

const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, PUT, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    "Content-Type": "application/json"
  })
};

@Injectable()
export class SummonerService {
  private apiurl: string;
  baseApiUrl = environment.baseApiUrl;
  baseDragonUrl = environment.baseDragonUrl;

  constructor(private http: HttpClient) { }

  setURL(name: string) {
    this.apiurl = "https://cors-anywhere.herokuapp.com/" + this.baseApiUrl +
      "/lol/summoner/v4/summoners/by-name/" + name + "?api_key=RGAPI-7a4ec62e-e03e-4994-b989-44cce62380bf";
    // this.apiurl = '/api/lol/summoner/v4/summoners/by-name/' + name + '?api_key=RGAPI-7a4ec62e-e03e-4994-b989-44cce62380bf';//localhost
  }
  setURL2(summonerID: string) {
    this.apiurl = "https://cors-anywhere.herokuapp.com/" + this.baseApiUrl +
      "/lol/league/v4/entries/by-summoner/" + summonerID + "?api_key=RGAPI-7a4ec62e-e03e-4994-b989-44cce62380bf";
    // this.apiurl = '/api/lol/league/v4/entries/by-summoner/' + summonerID + '?api_key=RGAPI-7a4ec62e-e03e-4994-b989-44cce62380bf';//localhost
  }

  getdata(name: string): Observable<LOLUserData> {
    this.setURL(name);
    return this.http
      .get<LOLUserData>(this.apiurl, { headers: httpOptions.headers })
      .pipe(
        map(res => res),
        catchError(error => {
          return throwError(true);
        })
      );
  }

  getRankdata(summonerID: string): Observable<RankInfo> {
    this.setURL2(summonerID);

    return this.http
      .get<RankInfo>(this.apiurl, { headers: httpOptions.headers })
      .pipe(map(res => res));
  }
}
