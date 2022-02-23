import { action, computed, observable, makeObservable } from "mobx";
import { http } from "../utils/http";

export class Authentication {
    // @observable email = '';
    // @observable profile = {};
    // @observable dataUser = '';
    // @observable dataUserID = '';
    // @observable morID = "";

    email = '';
    profile = {};
    dataUser = '';
    dataUserID = '';
    morID = "";

    // constructor(context) {
    //     this.context = context;
    // }

    constructor(context) {
        makeObservable(this, {
            email: observable,
            profile: observable,
            dataUser: observable,
            dataUserID: observable,
            morID: observable,
            userData: computed,
            login: action,
            logout: action
        })
    }

    // @computed
    get userData() {
        if (!this.context.accessToken) {
            return {
                id: '',
                role: '',
                email: '',
                fullname: '',
                phone_number: ''

            };
        }
        // console.log({ ctx: this.context })
        // console.log(this.context.accessToken, 'this.context.accessToken');
        // console.log(typeof this.context.accessToken, 'this.context.accessToken');
        return JSON.parse(atob(this.context.accessToken.split('.')[1]));
    }

    // @action
    async login({ email, password }) {
        console.log("Yeay I'am Logged In!")
        await http.post('/authorization/login').send({
            email,
            password,

        }).then((res) => {

            this.context.setToken(res.body.token, '')
            this.dataUser = res.body.user.role;
            localStorage.setItem('role', res.body.user.role);

            // console.log("morID: ", this.morID)
            // this.dataUserID = res.body.user.id;
            // localStorage.setItem('userID', res.body.user.id);

            // this.dataUserID = res.body.user.sppbeId;
            // localStorage.setItem('sppbeID', res.body.user.sppbeId);
            return res
        }).catch(err => {
            throw err
        })
        console.log("Done Login Authentication.")
    }

    // @action
    logout() {
        // this.context.setToken('');
        localStorage.removeItem('role');
        // localStorage.removeItem('userID');
    }
}
