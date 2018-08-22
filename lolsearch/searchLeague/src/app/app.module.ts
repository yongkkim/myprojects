import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SummonerComponent } from './summoner/summoner.component';
import { SummonerHistoryComponent } from './summoner-history/summoner-history.component';
import { SummonerOnegameHistoryComponent } from './summoner-onegame-history/summoner-onegame-history.component';
import { ChampionStatsComponent } from './champion-stats/champion-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    SummonerComponent,
    SummonerHistoryComponent,
    SummonerOnegameHistoryComponent,
    ChampionStatsComponent
  ],
  imports: [
    BrowserModule,
	HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
