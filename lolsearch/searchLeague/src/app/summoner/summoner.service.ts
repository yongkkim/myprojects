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
<<<<<<< HEAD
	 this.apiurl = '/api/lol/summoner/v3/summoners/by-name/' + name + '?api_key=RGAPI-cf0256aa-b524-4a91-9134-3d3404565252';
=======
	 this.apiurl = '/api/lol/summoner/v3/summoners/by-name/' + name + '?api_key=RGAPI-e25b43b3-57a5-4b51-a6e3-2fddca5f7bd9';
>>>>>>> 5c7e29a9b614a085a2485b874a41a1db953dd689
  }
  
  getdata(name: string): Observable<LOLUserData>
  {
	this.setURL(name);
	return this.http.get<LOLUserData>(this.apiurl, httpOptions).pipe(map(res => res));
  }
}
