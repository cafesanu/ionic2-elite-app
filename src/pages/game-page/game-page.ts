import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import * as _ from 'lodash';

import { EliteApi } from '../../shared/shared';
import { TeamHomePage } from '../pages';

@Component({
  selector: 'page-game-page',
  templateUrl: 'game-page.html'
})
export class GamePage {
  game: any = {};

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private eliteApi: EliteApi
  ) {

  }

  ionViewDidLoad() {
    this.game = this.navParams.data;
  }

  teamTapped(teamId) {
    let tournamentData = this.eliteApi.getCurrentTournament(),
      team = _.find(tournamentData.teams, {
        id: teamId
      });

    this.navCtrl.push(TeamHomePage, team);
  }

}
