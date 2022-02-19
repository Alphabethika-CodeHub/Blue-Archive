import { computed, observable, makeObservable } from "mobx";
import { UI } from "./UI";
import { Authentication } from './Authentication';
import { Roles } from './Roles';
import { Complaint } from "./Complaint";

export class Store {
    // @observable
    accessToken = '';

    // @observable
    refreshToken = '';

    constructor() {
        makeObservable(this, {
            accessToken: observable,
            refreshToken: observable,
            isLoggedIn: computed
        })
    }

    // START STORES
    roles = new Roles(this);
    authentication = new Authentication(this)
    complaint = new Complaint(this);
    ui = new UI(this);

    // END STORE
    // @computed
    get isLoggedIn() {
        return !!this.accessToken;
    }

    setInitialToken(accessToken, refreshToken) {
        if (accessToken === 'null') {
            accessToken = null
        }

        if (refreshToken === 'null') {
            refreshToken = null
        }

        this.setToken(accessToken, refreshToken);
    }

    setToken(accessToken, refreshToken) {
        if (accessToken === 'null') {
            accessToken = null;
        }

        if (refreshToken === 'null') {
            refreshToken = null;
        }

        this.accessToken = accessToken;
        this.refreshToken = refreshToken;

        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
    }
}

// decorate(Store, {
//     accessToken: observable,
//     refreshToken: observable,
//     isLoggedIn: computed
// });