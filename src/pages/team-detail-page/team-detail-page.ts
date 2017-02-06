import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import * as _ from "lodash";
import {EliteApi} from "../../shared/shared";
import {GamePage} from "../pages";
import * as moment from 'moment';

@Component({
    selector: 'page-team-detail-page',
    templateUrl: 'team-detail-page.html'
})
export class TeamDetailPage {
    allGames: any[];
    games: any[];
    team: any;
    teamStanding: any;
    private tournamentData: any;


    constructor(private navCtrl: NavController,
                private navParams: NavParams,
                private eliteApi: EliteApi) {
        this.team = this.navParams.data;
        this.tournamentData = this.eliteApi.getCurrentTournament();
        this.games = _.chain(this.tournamentData.games)
            .filter(game => game.team1Id === this.team.id || game.team2Id === this.team.id)
            .map(game => {
                let isTeam1 = (game.team1Id === this.team.id),
                    opponentName = isTeam1 ? game.team2 : game.team1,
                    scoreDisplay = this.getScoreDisplay(isTeam1, game.team1Score, game.team2Score);
                return {
                    gameId: game.id,
                    opponent: opponentName,
                    time: Date.parse(game.time),
                    location: game.location,
                    locationUrl: game.locationUrl,
                    scoreDisplay: scoreDisplay,
                    homeAway: (isTeam1 ? 'vs.' : 'at')
                }
            })
            .value();
        this.allGames = this.games;
        this.teamStanding = _.find(this.tournamentData.standings, {
            teamId: this.team.id
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad TeamDetailPage');
    }

    getScoreDisplay(isTeam1, team1Score, team2Score) {
        if (team1Score && team2Score) {
            let teamScore = isTeam1 ? team1Score : team2Score,
                opponentScore = isTeam1 ? team2Score : team1Score,
                winIndicator = teamScore > opponentScore ? "W: " : "L: ";

            return winIndicator + teamScore + "-" + opponentScore;
        }
        return "";
    }

    gameClicked($event, game) {
        let sourceGame = _.find(this.tournamentData.games, {
            id: game.gameId
        });

        this.navCtrl.parent.parent.push(GamePage, sourceGame);
    }

    dateChanged() {
        this.games = _.filter(this.games, g => moment(g.time).isSame(this.dateFilter, 'day'));
    }

}
