import { Component, OnInit, Input, NgZone } from '@angular/core';
import { LOLUserData } from './lolinterface';
import { SummonerService } from './summoner.service';
import { debounceTime } from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { RankInfo } from './rankinfo';

@Component({
  selector: 'app-summoner',
  templateUrl: './summoner.component.html',
  providers: [ SummonerService ],
  styleUrls: ['./summoner.component.css']
})
export class SummonerComponent implements OnInit{

  private typed : boolean = false;
  private heroes: LOLUserData;
  private url: string = 'http://ddragon.leagueoflegends.com/cdn/8.19.1/img/profileicon/';
  private profileimg: string = "";
  private notMatching: boolean = false;
  private errorMsg: string = "";
  public form: FormGroup;
  public summonerName: FormControl;
  private fromClick : boolean = false;
  private submitted: boolean = false;
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
    .subscribe(hero => 
        this.zone.run(() => {
        this.heroes = hero;
        this.heroes.profileimg = this.url + this.heroes.profileIconId + ".png";
        this.heroes.searchForm = this.form;
        this.heroes.searchControl = this.summonerName;
        this.summonerService.getRankdata(this.heroes.id)
        .subscribe(rank => {
          this.heroes.rank = rank
          console.log(rank);
        });       
        })
      ,
      (error => 
      {
        this.setErrValue(this.heroes)
        console.log(this.notMatching);
      }),
      () => console.log("done")
    )
  }
  setErrValue(ob: any){
    this.submitted = false;
    if(ob == null){
      let err2 = document.getElementById("err2");
      err2.style.display = "block";
      err2.innerHTML = "Cannot find the Summoner";
    }
  }
  
  onSubmit(){
    this.submitted = true;

    if(this.form.invalid){
      let err1 = document.getElementById("err1");
      if(err1 != null || err1.style.display == "none"){
        err1.style.display = "block";
      }
      this.submitted = false;
      return;
    }
    this.getHeroes(this.form.get("summonerName").value);
  }

  backToDefault(){
	this.heroes = null;
  }

  checkObj(hrs: LOLUserData) : boolean{
    let input = document.getElementById("search");
    let start = document.getElementById("start");
    let error1 = document.getElementById("err1");
    let error2 = document.getElementById("err2");
    let logo = document.getElementById("textLogo");
    let html = document.getElementsByTagName("html")[0];

    if(hrs != null){
      this.submitted = false;

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
