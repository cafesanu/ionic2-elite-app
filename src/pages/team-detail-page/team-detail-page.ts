import { Component } from "@angular/core";
import { NavController, NavParams, AlertController, ToastController } from "ionic-angular";
import * as _ from "lodash";
import {
    EliteApi,
    UserSettings
} from "../../shared/shared";
import { GamePage } from "../pages";
import * as moment from "moment";

@Component({
    selector: 'page-team-detail-page',
    templateUrl: 'team-detail-page.html'
})
export class TeamDetailPage {
    allGames: any[];
    games: any[];
    team: any = {};
    teamStanding: any = {};
    isFollowing: boolean = false;
    dateFilter: string;
    useDateFilter: boolean = false;
    private tournamentData: any;


    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private eliteApi: EliteApi,
        private userSettings: UserSettings,
        private toastController: ToastController,
        private alertController: AlertController) {
    }

    ionViewDidLoad() {
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
        this.userSettings.isFavoriteTeam(this.team.id).then(isFollowing => this.isFollowing = isFollowing);
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
        if (this.useDateFilter) {
            this.games = _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'));
        } else {
            this.games = this.allGames;
        }
    }

    isGameWon(game) {
        return game.scoreDisplay.indexOf('W') === 0;
    }

    getWorL(game) {
        return game.scoreDisplay ? game.scoreDisplay[0] : '';
    }

    toggleFollow() {
        if (this.isFollowing) {
            let confirm = this.alertController.create({
                title: 'Unfollow?',
                message: "Are you sure you want to unfollow?",
                buttons: [{
                    text: 'Yes',
                    handler: () => {
                        this.isFollowing = false;
                        this.userSettings.unfavoriteTeam(this.team);

                        let toast = this.toastController.create({
                            message: 'You have unfollowed this team',
                            duration: 2 * 1000,
                            position: 'bottom'
                        });
                        toast.present();
                    }
                }, {
                    text: 'No'
                }]
            })
            confirm.present();
        } else {
            this.isFollowing = true;
            this.userSettings.favoriteTeam(
                this.team,
                this.tournamentData.tournament.id,
                this.tournamentData.tournament.name
            );
        }
    }

    refreshAll($eventRefresher) {
        this.eliteApi.refreshCurrentTournament().subscribe(() => {
            $eventRefresher.complete();
            this.ionViewDidLoad();
        })
    }

}
