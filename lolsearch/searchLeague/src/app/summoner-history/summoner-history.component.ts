import { Component, OnInit, Input, ElementRef } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SummonerHistoryService } from "./summoner-history.service";
import { SummonerComponent } from "../summoner/summoner.component";
import { SummonerOnegameHistoryService } from "../summoner-onegame-history/summoner-onegame-history.service";
import { LOLUserData } from "../summoner/lolinterface";
import { RankInfo } from "../summoner/rankinfo";
import { Match } from "./match";
import { Champ } from "./champ";
import { Spell } from "./Spell";
import { Player } from "../summoner-onegame-history/player";
import { Item } from "./item";
import { Spells } from "./spells";

@Component({
  selector: "app-summoner-history",
  templateUrl: "./summoner-history.component.html",
  styleUrls: ["./summoner-history.component.css"]
})
export class SummonerHistoryComponent implements OnInit {
  private champimages: Champ;
  public images: Array<any[]> = [];
  private memberimages: Array<Array<string[]>> = [];
  private players: Player[];
  private url: string =
    "http://ddragon.leagueoflegends.com/cdn/9.13.1/img/champion/";
  private spellurl: string =
    "http://ddragon.leagueoflegends.com/cdn/9.13.1/img/spell/";
  private itemurl: string =
    "http://ddragon.leagueoflegends.com/cdn/9.13.1/img/item/";
  public itemicon: string =
    "http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/items.png";
  public goldicon: string =
    "http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/gold.png";
  public kdaicon: string =
    "http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/score.png";
  public champicon: string =
    "http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/champion.png";
  public minionicon: string =
    "http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/minion.png";
  public spellicon: string =
    "http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/spells.png";
  private spell: Spell;
  private item: Item;
  private keys = new Map();
  private history: Match;
  private clicked: Array<string[]> = [];
  private initialhis: Array<string[]> = [];
  private deviceType: string;
  private deskorcell: boolean;
  private form: FormGroup;
  private control: FormControl;
  private countWin: number = 0;
  public winRate: string = "";
  public rankinfo: string = "";
  @Input("userinfo") public info: LOLUserData;

  constructor(
    private summonerComponent: SummonerComponent,
    private summonerHistoryService: SummonerHistoryService,
    private summonerOneGameHistoryService: SummonerOnegameHistoryService
  ) { }

  ngOnInit() {
    window.addEventListener("scroll", this.searchbar, true);

    if (this.info != null) {
      if (this.info.rank != undefined) {
        this.rankinfo =
          this.info.rank.tier +
          " " +
          this.info.rank.rank +
          " / " +
          this.info.rank.leaguePoints +
          " Point  / " +
          this.info.rank.wins +
          "W:" +
          this.info.rank.losses +
          "L";
      } else {
        this.rankinfo = "Unranked";
      }
      this.findHistory();
    }
  }

  searchbar() {
    let searchbar = document.getElementById("searchform");
    let sticky = searchbar.offsetTop;
    let marginprofile = document.getElementById("profile");

    if (window.pageYOffset > sticky) {
      searchbar.classList.add("sticky");
      marginprofile.style.marginTop = "85px";
      searchbar.style.marginBottom = "80px";
    } else {
      searchbar.classList.remove("sticky");
      marginprofile.style.marginTop = "25px";
      searchbar.style.marginBottom = "0";
    }
  }
  findHistory() {
    this.getHistory(this.info.accountId.toString());
  }
  getHistory(id: string): void {
    this.summonerHistoryService.getitem().subscribe(im => {
      this.item = im;
    });
    this.summonerHistoryService.getspell().subscribe(spl => {
      this.spell = spl;
    });
    this.summonerHistoryService.getdata(id).subscribe(his => {
      this.history = his;
      this.summonerHistoryService.getimage().subscribe(img => {
        this.champimages = img;
        for (let c in this.champimages.data) {
          let mix: Array<any> = [];
          mix.push(this.champimages.data[c].image.full);
          mix.push(this.champimages.data[c].name);
          this.keys.set(this.champimages.data[c].key, mix);
        }
        this.history.champlist = this.keys;
        this.history.matches.forEach(ig => {
          let i: any[] = [];
          let mix = this.keys.get(ig.champion.toString());
          let champinfo = this.url + mix[0];
          i.push(champinfo);
          i.push(mix[1]);
          i.push(ig.gameId);
          this.images.push(i);
        });
        this.summonerOneGameHistoryService
          .getdata(this.history)
          .subscribe(play => {
            this.players = play;
            this.players.forEach(player => {
              let winner: number;
              let accinfo: Array<any[]> = [];
              let temp: Array<any[]> = [];
              let me: any[] = [];
              let account: string[] = [];

              let currdate = new Date();
              let timetaken: number = player.gameDuration;
              let gameCreated: number = player.gameCreation;
              let gc = new Date(gameCreated);

              //checking a date differenced between game creation and current date
              let dayDifference: number = this.datediff(gc, currdate);

              //checking every game that has been played within 6 months.
              //if a game is older than 6 months, it will be discardedd
              if (dayDifference < 185) {
                player.teams.forEach(winteam => {
                  if (winteam.win == "Win") {
                    winner = winteam.teamId;
                  }
                });
                player.participantIdentities.forEach(first => {
                  let account: any[] = [];
                  account.push(first.player.summonerName);
                  account.push(first.player.accountId);
                  accinfo.push(account);
                });
                player.participants.forEach((igs, index) => {
                  //for each player's champ, spells, items, kda, total money earned, total minions killed
                  let acid = accinfo[index];
                  let temp2: any[] = [];
                  let kda: string = "";
                  let iturl: string[] = [];
                  let mix = this.history.champlist.get(
                    igs.championId.toString()
                  );
                  let champinfo = this.url + mix[0];
                  //console.log(mix[1]);
                  //Champion image
                  temp2.push(champinfo);

                  //spells
                  temp2.push(this.findspell(igs.spell1Id));
                  temp2.push(this.findspell(igs.spell2Id));

                  //items
                  temp2.push(this.finditem(igs.stats.item0, temp2[0]));
                  temp2.push(this.finditem(igs.stats.item1, temp2[0]));
                  temp2.push(this.finditem(igs.stats.item2, temp2[0]));
                  temp2.push(this.finditem(igs.stats.item3, temp2[0]));
                  temp2.push(this.finditem(igs.stats.item4, temp2[0]));
                  temp2.push(this.finditem(igs.stats.item5, temp2[0]));
                  temp2.push(this.finditem(igs.stats.item6, temp2[0]));

                  //kda (Kill/Death/Assist)
                  kda = igs.stats.kills.toString() + "/" + igs.stats.deaths.toString() + "/" + igs.stats.assists.toString();
                  temp2.push(kda);
                  if (igs.stats.deaths == 0) {
                    //when there is no death
                    temp2.push("PERFECT KDA");
                  } else {
                    temp2.push(
                      (
                        (igs.stats.kills + igs.stats.assists) /
                        igs.stats.deaths
                      ).toFixed(2) + ":1 KDA"
                    );
                  }

                  //minions
                  temp2.push(igs.stats.totalMinionsKilled + " CS");
                  //money earned
                  temp2.push((igs.stats.goldEarned / 1000).toFixed(1) + "k");

                  if (igs.teamId == winner) {
                    temp2.push("win");
                  } else {
                    temp2.push("loss");
                  }

                  temp2.push(mix[1]);
                  temp2.push(acid);
                  temp.push(temp2);

                  if (acid[1] == this.info.accountId) {
                    if (igs.teamId == winner) {
                      this.countWin++;
                    }
                    temp2.push(player.gameMode);
                    let second = Number((timetaken % 60).toFixed(2));
                    let total = (Math.floor(timetaken / 60) + second / 100).toFixed(2);
                    total = total.replace(/\./g, ":");
                    let d = new Date(gameCreated);
                    temp2.push(total);
                    temp2.push(
                      d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()
                    );
                    me = temp2;
                  }
                });

                //add info to initialhis for list of history
                this.initialhis.push(me);
                let gameid: string[] = [];
                gameid.push(player.gameId.toString());
                temp.push(gameid);
                this.memberimages.push(temp);

                this.winRate =
                  this.countWin +
                  "W/" +
                  Math.abs(this.countWin - this.initialhis.length) +
                  "L";
              }
              //console.log("--------------done info----------------");
            });
            setTimeout(() => {
              if (this.initialhis.length == 0) {
                let noinfo = document.getElementById("content");
                noinfo.innerHTML =
                  "The user is inactive for more than 6 months";
                noinfo.style.color = "white";
                noinfo.style.textAlign = "center";
              }
            }, 2000);
          });
      });
    });
  }

  checkImage(image: any): string {
    if (image == "nothing") {
      return "assets/empty.png";
    } else {
      return image.itemsrc;
    }
  }
  setBackground(winloss: string) {
    if (winloss == "win") {
      return "#a3cfec";
    } else {
      return "#e2b6b3";
    }
  }
  toggle(gid: string, n: string, abc: any, event) {
    //where n is order number of li tag
    let div = document.getElementById(n);
    let li = document.getElementById(gid);
    if (
      this.deviceType == "smartphone" &&
      (event.target.tagName == "BUTTON" || event.target.tagName == "I")
    ) {
      event.stopPropagation();
      if (div.getAttribute("value") == "yes") {
        div.style.display = "none";
        div.setAttribute("value", "no");
      } else {
        div.style.display = "block";
        div.setAttribute("value", "yes");
        div.style.border = "none";
      }
    } else if (this.deviceType == "desktop") {
      if (div.getAttribute("value") == "yes") {
        div.style.display = "none";
        div.setAttribute("value", "no");
        li.blur();
      } else {
        div.style.display = "block";
        div.style.borderWidth = "0 1px 1px 1px";
        div.style.borderColor = "#008B8B";
        div.style.borderStyle = "solid";
        div.setAttribute("value", "yes");
        li.scrollIntoView();
        window.scrollBy(0, -80);
      }
    }
  }
  data(gid: string): Array<string[]> {
    this.memberimages.forEach((item, index) => {
      item.forEach((i, index) => {
        if (i[i.length - 1] == gid) {
          this.clicked = item;
          index = item.length;
        }
      });
      index = this.memberimages.length;
    });
    return this.clicked;
  }
  pop(half: number, img: string, desc: string, event) {
    let newdiv = document.createElement("div");
    newdiv.id = "desc";
    let newimg = document.createElement("img");
    newimg.src = img;
    let newtext = document.createElement("p");
    newtext.id = "text";
    let pos = event.target.getBoundingClientRect();
    let newpos;

    if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      newdiv.setAttribute("style",
        "position: fixed; height:auto; width: 650px; background-color: #3B3B3B; color: white; z-index: 10; border-radius: 5px; padding: 5px; opacity: 0.9;"
      );
      newtext.setAttribute("style", "padding: 0; margin: 0; font-size: 8px;");
      newimg.setAttribute("style", "height: 30px; width: 30px;");
    } else {
      newdiv.setAttribute("style",
        "position: fixed; height:auto; width: 250px; background-color: #3B3B3B; color: white; z-index: 10; border-radius: 5px; padding: 5px; opacity: 0.9;"
      );
      newtext.setAttribute("style", "padding: 0; margin: 0; font-size: 11px;");
    }
    if (half != -2 && half != -3 && half != -4) {
      newdiv.appendChild(newimg);
    }
    newtext.innerHTML = desc;
    newdiv.appendChild(newtext);
    event.target.parentElement.appendChild(newdiv);
    newdiv.style.display = "block";
    newpos = this.setdivpos(
      half,
      event.target.className,
      pos.width,
      pos.top,
      pos.bottom
    );
    newdiv.style.transform = newpos;
  }
  out() {
    let selected = document.getElementById("desc");
    selected.parentNode.removeChild(selected);
  }
  findspell(spellid: number): Spells {
    for (let c in this.spell.data) {
      if (spellid.toString() == this.spell.data[c].key) {
        this.spell.data[c].spellurl =
          this.spellurl + this.spell.data[c].image.full;
        return this.spell.data[c];
      }
    }
  }
  finditem(itemnum: number, hero: string): any {
    //console.log(itemnum);
    if (itemnum != 0) {
      this.item.data[itemnum].itemsrc =
        this.itemurl + this.item.data[itemnum].image.full;
      return this.item.data[itemnum];
    } else if (itemnum == 0) {
      return "nothing";
    }
  }
  setdivpos(th: number, cname: string, width: number, targettop: number, targetbot: number): string {
    //prevent popup window from going out of a page
    let pop = document.getElementById("desc");
    let poptext = document.getElementById("text");
    let poppos = pop.getBoundingClientRect();
    let pos: string = "";

    if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      if (th == -4) {
        pop.style.top = targetbot + "px";
        poptext.style.fontSize = "9px";
        pop.style.textAlign = "center";
        pop.style.width = "40px";
        pop.style.padding = "3px";
        poptext.style.fontWeight = "bold";
        pop.style.opacity = "1";
        pop.style.padding = "2px";
      } else if (th == -3) {
        pop.style.top = targetbot - 35 + "px";
        poptext.style.fontSize = "9px";
        pop.style.textAlign = "center";
        pop.style.width = "auto";
        //pop.style.padding = "3px";
      } else if (th == -2) {
        pop.style.top = targetbot - 28 + "px";
        poptext.style.fontSize = "9px";
        poptext.style.textAlign = "center";
        pop.style.width = "auto";
        pop.style.padding = "3px";
      } else {
        pop.style.width = "150px";
        if (targetbot + poppos.height > window.innerHeight - 40) {
          let newtop = targettop - poppos.height;
          pop.style.top = newtop + "px";
          pos = "translateX(" + width + "px)";
        } else {
          let firstc = cname.split(" ");
          if (firstc[0] == "spellimg") {
            pop.style.top = targettop.toString() + "px";
          } else if (firstc[0] == "item") {
            pop.style.top = targetbot.toString() + "px";
          }
          pos = "translateX(" + width + "px)";
        }
      }
    } else {
      if (th == -4) {
        ///Desktop
        pop.style.top = targetbot + "px";
        poptext.style.fontSize = "18px";
        poptext.style.marginBottom = "13px";
        poptext.style.fontWeight = "bold";
        pop.style.textAlign = "center";
        pop.style.opacity = "1";
        pop.style.width = "80px";
        pop.style.padding = "0px";
        pos = "translateX(" + (width - pop.offsetWidth) / 2 + "px)";
      } else if (th == -3) {
        pop.style.top = targetbot - 50 + "px";
        poptext.style.fontSize = "13px";
        pop.style.textAlign = "center";
        pop.style.width = "auto";
        pop.style.padding = "4px";
        pos = "translateX(" + (width - pop.offsetWidth) / 2 + "px)";
      } else if (th == -2) {
        pop.style.top = targetbot - 50 + "px";
        poptext.style.fontSize = "15px";
        pop.style.textAlign = "center";
        pop.style.width = "auto";
        pop.style.padding = "6px";
        pos = "translateX(" + (width - pop.offsetWidth) / 2 + "px)";
      } else {
        if (targetbot + poppos.height > window.innerHeight - 30) {
          let newtop = targettop - (poppos.height + 5);
          pop.style.top = newtop.toString() + "px";
          pos = "translateX(" + width + "px)";
        } else {
          let firstc = cname.split(" ");
          if (firstc[0] == "spellimg") {
            pop.style.top = targettop.toString() + "px";
          } else if (firstc[0] == "item") {
            pop.style.top = targetbot.toString() + "px";
          }
          pos = "translateX(" + width + "px)";
        }
      }
    }
    return pos;
  }
  findtype(): boolean {
    if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.deviceType = "smartphone";
      return true;
    } else {
      this.deviceType = "desktop";
      return false;
    }
  }
  searchIt(accid: string) {
    this.info = null;
    this.summonerComponent.form.get("summonerName").setValue(accid);
    document.getElementById("submit").click();
    this.ngOnInit();
  }

  datediff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }
}
