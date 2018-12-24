import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders} from  '@angular/common/http';
import { Observable, from} from 'rxjs';
import { map } from 'rxjs/operators';
import { LOLUserData } from './lolinterface';

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
	 this.apiurl = '/api/lol/summoner/v3/summoners/by-name/' + name + '?api_key=RGAPI-03df762a-e2d8-48c6-b7cb-14b947424b69';
  }
  
  getdata(name: string): Observable<LOLUserData>
  {
	this.setURL(name);
	return this.http.get<LOLUserData>(this.apiurl, httpOptions).pipe(map(res => res));
  }
}
