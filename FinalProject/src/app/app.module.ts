import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AddinfoPage} from '../pages/addinfo/addinfo';
import { RegisterPage } from '../pages/register/register';
import { ForYouPage } from '../pages/for-you/for-you';
import { TotalPage } from '../pages/total/total';
import { MapPage } from '../pages/map/map';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ContactPage } from '../pages/contact/contact';
import { DUserinfoPage } from '../pages/duserinfo/userinfo';
import { AUserinfoPage } from '../pages/auserinfo/userinfo';
import { UploadpicPage } from '../pages/uploadpic/uploadpic';

import { Tab1Page } from '../pages/tab1/tab1';
import { VerifyPage } from '../pages/verify/verify';
import { SellPage } from '../pages/sell/sell';
import { PersonalinfoPage } from '../pages/personalinfo/personalinfo';
import { CarPage } from '../pages/car/car';
import { AdinfoPage } from '../pages/adinfo/adinfo';
import { PersonalPage } from '../pages/personal/personal';
import { ProfilePage } from '../pages/profile/profile';
import { BankPage } from '../pages/bank/bank';
import { InfoPage } from '../pages/info/info';
import { MyAdsPage } from '../pages/my-ads/my-ads';
import { ForPage } from '../pages/for/for';
import { SearchPage } from '../pages/search/search';
import { Ionic2RatingModule } from 'ionic2-rating';
import { NgCalendarModule } from 'ionic2-calendar';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpModule } from '@angular/http';
import {ModelinfoPage} from '../pages/modelinfo/modelinfo';
import {DModelinfoPage} from '../pages/dmodelinfo/modelinfo';
import {AModelinfoPage} from '../pages/amodelinfo/modelinfo';
import {TipsPage} from '../pages/tips/tips'

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    ForPage,
    HomePage,
    UploadpicPage,
    DUserinfoPage,
    AUserinfoPage,
    ModelinfoPage,
    DModelinfoPage,
    AModelinfoPage,
    AddinfoPage,
    MapPage,
    RegisterPage,
    SearchPage,
    BankPage,
    InfoPage, 
    TipsPage,
    MyAdsPage,
    ProfilePage,
    ForYouPage,
    CarPage,
    TabsPage,
    PersonalPage,
    Tab1Page,
    ForYouPage,
    VerifyPage, 
    SellPage, 
    AdinfoPage,
    PersonalinfoPage,
    TotalPage,
   ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    NgCalendarModule,
    HttpModule,
    Ionic2RatingModule 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    AddinfoPage,
    TipsPage,
    RegisterPage,
    ForYouPage,
    SearchPage,
    ForPage,
    MapPage,
    ModelinfoPage,
    DModelinfoPage,
    AModelinfoPage,
    BankPage,
    UploadpicPage,
    InfoPage, 
    MyAdsPage,
    DUserinfoPage,
    AUserinfoPage,
    Tab1Page,
    ProfilePage,
    VerifyPage,
    PersonalPage,
    SellPage, 
    CarPage,
    AdinfoPage,
    PersonalinfoPage,
    HomePage,
    TabsPage,
    TotalPage,
     
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
