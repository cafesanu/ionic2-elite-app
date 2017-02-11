import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Events} from "ionic-angular";
import * as _ from 'lodash';

@Injectable()
export class UserSettings {
    constructor(
        private storage: Storage,
        private events: Events
    ) {
    }

    favoriteTeam(team, tournamentId, tournamentName) {
        let item = {
            team: team,
            tournamentId: tournamentId,
            tournamentName: tournamentName
        };

        this.storage.set(String(team.id), JSON.stringify(item))
            .then(() => this.events.publish('favorites:changed'));
        ;
    }

    unfavoriteTeam(team) {
        this.storage.remove(String(team.id))
            .then(() => this.events.publish('favorites:changed'));
    }

    isFavoriteTeam(teamId) {
        return this.storage.get(String(teamId)).then(value => Boolean(value));
    }

    getAllFavorites() {
        let items = [];

        return this.storage.forEach((v, k) => {
            items.push(JSON.parse(v));
        }).then(() => items);
    }
}

