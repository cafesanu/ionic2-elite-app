import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {
  MyTeamsPage,
  StandingsPage,
  TeamDetailPage
} from '../pages'

@Component({
  selector: 'page-team-home-page',
  templateUrl: 'team-home-page.html'
})
export class TeamHomePage {

  team: Object;
  standingsTab = StandingsPage;
  teamDetailTab = TeamDetailPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.team = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamHomePage');
  }

  goHome() {
    this.navCtrl.popToRoot();
  }

}
