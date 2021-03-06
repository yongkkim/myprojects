import { Injectable } from "@angular/core";
import {
  HttpClientModule,
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { Observable, from } from "rxjs";
import { map } from "rxjs/operators";
import { Match } from "./match";
import { Champ } from "./champ";
import { Spell } from "./spell";
import { Item } from "./item";
import { environment } from "src/environments/environment.prod";

const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, PUT, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class SummonerHistoryService {
  private apiurl: string;
  baseApiUrl = environment.baseApiUrl;
  baseDragonUrl = environment.baseDragonUrl;
  constructor(private http: HttpClient) { }

  setURL(id: string) {
    // this.apiurl = '/api/lol/match/v4/matchlists/by-account/' + id + '?beginIndex=0&endIndex=20&api_key=RGAPI-32bdd655-0b64-419f-a79a-b2d3986adf8d';
    this.apiurl = "https://cors-anywhere.herokuapp.com/" + this.baseApiUrl +
      "/lol/match/v4/matchlists/by-account/" + id + "?beginIndex=0&endIndex=20&api_key=RGAPI-32bdd655-0b64-419f-a79a-b2d3986adf8d";
  }
  getdata(id: string): Observable<Match> {
    this.setURL(id);
    return this.http.get<Match>(this.apiurl, httpOptions).pipe(map(res => res));
  }
  getimage(): Observable<Champ> {
    this.apiurl = "https://cors-anywhere.herokuapp.com/" + this.baseDragonUrl + "/cdn/10.1.1/data/en_US/champion.json"; //for production
    // this.apiurl = '/dragon/cdn/10.1.1/data/en_US/champion.json';//localhost
    return this.http.get<Champ>(this.apiurl, httpOptions).pipe(map(res => res));
  }
  getspell(): Observable<Spell> {
    this.apiurl = "https://cors-anywhere.herokuapp.com/" + this.baseDragonUrl + "/cdn/10.1.1/data/en_US/summoner.json"; //for production
    // this.apiurl = '/dragon/cdn/10.1.1/data/en_US/summoner.json';//localhost
    return this.http.get<Spell>(this.apiurl, httpOptions).pipe(map(res => res));
  }
  getitem(): Observable<Item> {
    this.apiurl = "https://cors-anywhere.herokuapp.com/" + this.baseDragonUrl + "/cdn/10.1.1/data/en_US/item.json"; //for production
    // this.apiurl = '/dragon/cdn/10.1.1/data/en_US/item.json';//localhost
    return this.http.get<Item>(this.apiurl, httpOptions).pipe(map(res => res));
  }
}
