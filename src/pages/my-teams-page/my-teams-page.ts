import {Component} from "@angular/core";
import {NavController, NavParams, LoadingController} from "ionic-angular";
import {TeamHomePage, TournamentsPage} from "../pages";
import {EliteApi, UserSettings} from "../../shared/shared";

@Component({
    selector: 'my-teams-page',
    templateUrl: 'my-teams-page.html'
})
export class MyTeamsPage {

    favorites = [];

    constructor(private navCtrl: NavController,
                private navParams: NavParams,
                private loadingController: LoadingController,
                private eliteApi: EliteApi,
                private userSettings: UserSettings) {

    }

    ionViewWillEnter() {
        this.userSettings.getAllFavorites().then((favorites) => this.favorites = favorites);
    }

    favoriteTapped($event, favorite) {
        let loader = this.loadingController.create({
            content: 'Getting data...',
            dismissOnPageChange: true
        });
        loader.present();
        this.eliteApi.getTournamentData(favorite.tournamentId)
            .subscribe(t => this.navCtrl.push(TeamHomePage, favorite.team));
    }

    goToTournaments() {
        this.navCtrl.push(TournamentsPage)
    }


}
