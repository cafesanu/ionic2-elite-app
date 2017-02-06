import { Component } from '@angular/core';
import {
  LoadingController,
  NavController,
  NavParams
} from 'ionic-angular';

import {
  MyTeamsPage,
  TeamsPage
} from '../pages'

import {
  EliteApi
} from '../../shared/shared'

@Component({
  selector: 'page-tournaments-page',
  templateUrl: 'tournaments-page.html'
})
export class TournamentsPage {
  tournaments: any;

  constructor(
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private navParams: NavParams,
    private eliteApi: EliteApi
  ) {

  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: 'Getting tournaments'
    });

    loader.present().then(() => {
      this.eliteApi.getTournaments().then(data => {
        this.tournaments = data;
        loader.dismiss();
      });
    });
  }

  itemTapped($event, tournament) {
    this.navCtrl.push(TeamsPage, tournament);
  }

}
