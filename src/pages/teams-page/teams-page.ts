import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController } from "ionic-angular";
import { TeamHomePage } from "../pages";
import { EliteApi } from "../../shared/shared";
import * as _ from "lodash";

@Component({
    selector: 'page-teams-page',
    templateUrl: 'teams-page.html'
})
export class TeamsPage {
    private allTeams: any;
    private allTeamDivisions: any;
    private queryText: string = '';

    teams = [];

    constructor(private navCtrl: NavController,
        private navParams: NavParams,
        private loadingController: LoadingController,
        private eliteApi: EliteApi) {

    }

    ionViewDidLoad() {
        let selectedTournament = this.navParams.data;
        let loader = this.loadingController.create({
            content: 'Getting data...'
        });

        loader.present().then(() => {
            this.eliteApi.getTournamentData(selectedTournament.id)
                .subscribe(data => {
                    this.allTeams = data.teams;
                    this.allTeamDivisions = _.chain(data.teams)
                        .groupBy('division')
                        .toPairs()
                        .map(i => _.zipObject(['divisionName', 'divisionTeams'], i))
                        .value();

                    this.teams = this.allTeamDivisions;

                    console.log('division teams', this.teams);
                    loader.dismiss();
                });

        });

    }

    itemTapped($event, team) {
        this.navCtrl.push(TeamHomePage, team);
    }

    updateTeams() {
        let queryTextLower = this.queryText.toLowerCase();
        let filteredTeams = [];
        _.forEach(this.allTeamDivisions, td => {
            let teams = _.filter(td.divisionTeams, t => (<any>t).name.toLowerCase().includes(queryTextLower));
            if (teams.length) {
                filteredTeams.push({ divisionName: td.divisionName, divisionTeams: teams });
            }
        });

        this.teams = filteredTeams;
    }

}
