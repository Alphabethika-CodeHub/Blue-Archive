import { BaseStore } from "./Base_Store";
export class Roles extends BaseStore {

    constructor(context) {
        super(context);
        this.baseUrl = '/roles/'
    }
}
