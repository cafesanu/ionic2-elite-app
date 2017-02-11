import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import * as _ from "lodash";
import {EliteApi} from "../../shared/shared";

@Component({
    selector: 'page-standings-page',
    templateUrl: 'standings-page.html'
})
export class StandingsPage {

    allStandings: any[];
    standings: any[];
    team: any[];


    constructor(private navCtrl: NavController,
                private navParams: NavParams,
                private eliteApi: EliteApi) {
    }

    ionViewDidLoad() {
        let tournamentData = this.eliteApi.getCurrentTournament();
        this.team = this.navParams.data;
        this.standings = tournamentData.standings;
    }

    getHeader(record, recordIndex, records) {
        if(recordIndex === 0 || record.division !== records[recordIndex-1].division) {
            return record.division;
        }
        return null;
    }

}
