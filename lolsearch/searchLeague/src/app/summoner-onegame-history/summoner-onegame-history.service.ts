import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, forkJoin } from "rxjs";
import { map } from "rxjs/operators";
import { Player } from "./player";
import { Match } from "../summoner-history/match";
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
export class SummonerOnegameHistoryService {
  private apiurl: string;
  baseApiUrl = environment.baseApiUrl;
  baseDragonUrl = environment.baseDragonUrl;

  constructor(private http: HttpClient) { }

  setURL(gameid: string) {
    // this.apiurl = "/api/lol/match/v4/matches/" + gameid + "?api_key=RGAPI-32bdd655-0b64-419f-a79a-b2d3986adf8d";//localhost
    this.apiurl = "https://cors-anywhere.herokuapp.com/" + this.baseApiUrl +
      "/lol/match/v4/matches/" + gameid + "?api_key=RGAPI-32bdd655-0b64-419f-a79a-b2d3986adf8d";
  }

  getdata(match: Match): Observable<Player[]> {
    let observableGroup = [];
    match.matches.forEach(ig => {
      this.setURL(ig.gameId.toString());
      observableGroup.push(
        this.http.get<Player>(this.apiurl, httpOptions).pipe(map(res => res))
      );
    });

    return forkJoin(...observableGroup);
  }
}
