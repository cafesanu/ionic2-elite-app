import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { GamePage } from '../pages/pages';
import { MyTeamsPage } from '../pages/pages';
import { StandingsPage } from '../pages/pages';
import { TeamDetailPage } from '../pages/pages';
import { TeamHomePage } from '../pages/pages';
import { TeamsPage } from '../pages/pages';
import { TournamentsPage } from '../pages/pages';

@NgModule({
  declarations: [
    MyApp,
    GamePage,
    MyTeamsPage,
    StandingsPage,
    TeamDetailPage,
    TeamHomePage,
    TeamsPage,
    TournamentsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GamePage,
    MyTeamsPage,
    StandingsPage,
    TeamDetailPage,
    TeamHomePage,
    TeamsPage,
    TournamentsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
