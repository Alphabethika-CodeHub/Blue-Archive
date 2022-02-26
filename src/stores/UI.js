import { action, makeObservable } from "mobx";

export class UI {

    tabIndex = 1;
    user = 0;

    constructor() {
        makeObservable(this, {
            setTabIndex: action
        });
    }

    setTabIndex(value) {
        this.tabIndex = value;
    }

    setOverrideUser(value) {
        this.user = value;
    }
}
