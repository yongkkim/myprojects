import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SummonerComponent } from './summoner/summoner.component';
import { SummonerHistoryComponent } from './summoner-history/summoner-history.component';
import { SummonerOnegameHistoryComponent } from './summoner-onegame-history/summoner-onegame-history.component';
<<<<<<< HEAD
import { ChampionStatsComponent } from './champion-stats/champion-stats.component';
=======
>>>>>>> 5c7e29a9b614a085a2485b874a41a1db953dd689

@NgModule({
  declarations: [
    AppComponent,
    SummonerComponent,
    SummonerHistoryComponent,
<<<<<<< HEAD
    SummonerOnegameHistoryComponent,
    ChampionStatsComponent
=======
    SummonerOnegameHistoryComponent
>>>>>>> 5c7e29a9b614a085a2485b874a41a1db953dd689
  ],
  imports: [
    BrowserModule,
	HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
