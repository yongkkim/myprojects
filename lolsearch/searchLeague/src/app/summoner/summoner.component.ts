import { OnInit, NgZone, Component } from "@angular/core";
import { LOLUserData } from "./lolinterface";
import { SummonerService } from "./summoner.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  trigger,
  state,
  transition,
  animate,
  style
} from "@angular/animations";

@Component({
  selector: "app-summoner",
  templateUrl: "./summoner.component.html",
  providers: [SummonerService],
  styleUrls: ["./summoner.component.css"],
  animations: [
    trigger("message", [
      state(
        "open",
        style({
          opacity: "1",
          display: "block"
        })
      ),
      state(
        "close",
        style({
          opacity: "0",
          display: "none"
        })
      ),
      transition(":enter", [
        style({ opacity: 0 }),
        animate("1000ms", style({ opacity: 1 }))
      ]),
      transition("open => close", animate("1000ms"))
    ])
  ]
})
export class SummonerComponent implements OnInit {
  status: string = "open";
  private typed: boolean = false;
  public heroes: LOLUserData;
  private url: string =
    "http://ddragon.leagueoflegends.com/cdn/9.13.1/img/profileicon/";
  private profileimg: string = "";
  private notMatching: boolean = false;
  private errorMsg: string = "";
  public form: FormGroup;
  public summonerName: FormControl;
  private fromClick: boolean = false;
  public submitted: boolean = false;
  private wrong: boolean = false;
  constructor(private summonerService: SummonerService, private zone: NgZone) { }

  ngOnInit(): void {
    this.summonerName = new FormControl("", Validators.required);
    this.form = new FormGroup({
      summonerName: this.summonerName
    });
  }
  message() {
    let msg = document.getElementById("message");
    let start = document.getElementById("start");

    this.status = "close";
  }
  getHeroes(name: string): void {
    this.summonerService.getdata(name).subscribe(
      hero => {
        this.heroes = hero;
        this.heroes.profileimg = this.url + this.heroes.profileIconId + ".png";
        this.submitted = true;
        this.summonerService.getRankdata(this.heroes.id).subscribe(rank => {
          this.heroes.rank = rank;
          console.log(this.heroes.rank.tier);
          console.log(this.heroes.rank.rank);
          console.log(this.heroes.rank.wins);
          console.log(this.heroes.rank.losses);
          console.log(this.heroes.rank.leaguePoints);
        });
      },
      error => this.setErrValue(this.heroes)
    );
  }
  setErrValue(ob: any) {
    this.submitted = false;
    if (ob == null) {
      let err2 = document.getElementById("err2");
      err2.style.display = "block";
      err2.innerHTML = "Cannot find the Summoner";
    }
  }
  inputValidate(invalid: boolean) {
    if (invalid) {
      let err1 = document.getElementById("err1");
      if (err1 != null || err1.style.display == "none") {
        err1.style.display = "block";
      }
      this.submitted = false;
      return false;
    } else {
      return true;
    }
  }
  onSubmit() {
    if (this.heroes != null) {
      this.heroes = null;
    }
    if (!this.inputValidate(this.form.invalid)) return;
    this.getHeroes(this.form.get("summonerName").value);
  }

  checkObj(hrs: LOLUserData): boolean {
    let input = document.getElementById("search");
    let start = document.getElementById("start");
    let error1 = document.getElementById("err1");
    let error2 = document.getElementById("err2");
    let logo = document.getElementById("textLogo");
    let html = document.getElementsByTagName("html")[0];
    let message = document.getElementById("message");

    if (hrs != null) {
      //console.log("came in = " + this.submitted);
      message.style.display = "none";

      this.form.get("summonerName").markAsPristine();
      this.form.get("summonerName").markAsUntouched();

      html.style.backgroundImage =
        "linear-gradient(to bottom, transparent 60%, #07131A), url('assets/Bilgewater.jpg')";
      html.style.backgroundColor = "#07131A";
      html.style.backgroundSize = "100% 100%";
      html.style.backgroundRepeat = "no-repeat";

      input.style.marginTop = "0";

      logo.style.display = "none";

      start.style.marginTop = "0";
      start.style.paddingTop = "0";
      start.style.border = "none";
      start.style.borderRadius = "0";

      if (
        /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        start.style.height = "60px";
        start.style.position = "relative";
        input.style.width = "100%";
      } else {
        start.style.height = "90px";
      }

      if (error1 != null) {
        error1.style.display = "none";
      }
      if (error2 != null) {
        error2.style.display = "none";
      }
      return true;
    }
    return false;
  }
}
