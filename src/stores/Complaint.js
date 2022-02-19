import { action, makeObservable, observable } from "mobx";

export class Complaint {
    TMP_DATA = "";

    constructor() {
        makeObservable(this, {
            TMP_DATA: observable,
            setTMP_DATA: action
        });
    }

    setTMP_DATA(val) {
        this.TMP_DATA = val;
    }

}