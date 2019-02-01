import { OnInit, NgZone, Component } from '@angular/core';
import { LOLUserData } from './lolinterface';
import { SummonerService } from './summoner.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { HttpHeaders} from  '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, content-type',
    'Content-Type':  'application/json'
  })
};


@Component({
  selector: 'app-summoner',
  templateUrl: './summoner.component.html',
  providers: [ SummonerService ],
  styleUrls: ['./summoner.component.css']
})

export class SummonerComponent implements OnInit{

  private typed : boolean = false;
  public heroes: LOLUserData;
  private url: string = 'http://ddragon.leagueoflegends.com/cdn/9.2.1/img/profileicon/';
  private profileimg: string = "";
  private notMatching: boolean = false;
  private errorMsg: string = "";
  public form: FormGroup;
  public summonerName: FormControl;
  private fromClick : boolean = false;
  public submitted: boolean = false;
  private wrong: boolean = false;
  constructor(private summonerService: SummonerService, private zone: NgZone) {  }

  ngOnInit(): void {
    this.summonerName = new FormControl('', Validators.required)
    this.form = new FormGroup({
      summonerName: this.summonerName
    });
  }

  getHeroes(name: string): void {
    this.summonerService.getdata(name)
    .subscribe(hero => {
        this.heroes = hero;
        this.heroes.profileimg = this.url + this.heroes.profileIconId + ".png";
        this.submitted = true;
          this.summonerService.getRankdata(this.heroes.id)
          .subscribe(rank => {
              this.heroes.rank = rank;
            });
        },       
        (error => this.setErrValue(this.heroes))
      );
  }
  setErrValue(ob: any){
    this.submitted = false;
    if(ob == null){
      let err2 = document.getElementById("err2");
      err2.style.display = "block";
      err2.innerHTML = "Cannot find the Summoner";
    }
  }
  inputValidate(invalid: boolean){
    if(invalid){
      let err1 = document.getElementById("err1");
      if(err1 != null || err1.style.display == "none"){
        err1.style.display = "block";
      }
      this.submitted = false;
      return false;
    }
    else{
      return true;
    }
  }
  onSubmit(){
    if(this.heroes != null){
      this.heroes = null;
    }
      if(!this.inputValidate(this.form.invalid))
        return;
      this.getHeroes(this.form.get("summonerName").value);
  }

  checkObj(hrs: LOLUserData) : boolean{
    let input = document.getElementById("search");
    let start = document.getElementById("start");
    let error1 = document.getElementById("err1");
    let error2 = document.getElementById("err2");
    let logo = document.getElementById("textLogo");
    let html = document.getElementsByTagName("html")[0];

    if(hrs != null){
      //console.log("came in = " + this.submitted);
      this.form.get("summonerName").markAsPristine();
      this.form.get("summonerName").markAsUntouched();

      html.style.backgroundImage = "linear-gradient(to bottom, transparent 60%, #07131A), url('../../assets/Bilgewater.jpg')";
      html.style.backgroundColor = "#07131A";
      html.style.backgroundSize = "100% 100%";
      html.style.backgroundRepeat = "no-repeat";

      input.style.marginTop = "0";

      logo.style.display = "none";

      start.style.marginTop = "0";
      start.style.paddingTop = "0";
      start.style.border = "none";
      start.style.borderRadius = "0";
      //start.style.borderBottom = "2px solid #D4D9FF";
      //start.style.boxShadow = "0 1px #9AA2E3";

      if( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        start.style.height= "60px"
      }
      else{
        start.style.height= "90px"
      }

      if(error1 != null){
        error1.style.display="none";
      }
      if(error2 != null){
        error2.style.display="none";
      }
      return true;
    }
    return false;
  }
}
