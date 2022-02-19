import { observable, action, makeObservable } from "mobx";
import { http } from "../utils/http";
import * as qs from 'querystring';
import { appConfig } from "../config/app";

export class BaseStore {
    // @observable baseUrl = '/';
    // @observable data = [];
    // @observable maxLength = [];
    // @observable detail = {};
    // @observable isLoading = true;

    // @observable sort = '-a.created_at';
    // @observable query = {
    //     page: 1,
    //     pageSize: 10,
    //     filter: {}
    // }

    baseUrl = '/';
    data = [];
    maxLength = [];
    detail = {};
    isLoading = true;

    sort = '-a.created_at';
    query = {
        page: 1,
        pageSize: 10,
        filter: {}
    }

    keyAccessor = {
        data: 'data'
    }

    // constructor(context) {
    //     this.context = context
    // }

    constructor() {
        makeObservable(this, {
            baseUrl: observable,
            data: observable,
            maxLength: observable,
            detail: observable,
            isLoading: observable,
            sort: observable,
            query: observable,
            getAll: action,
            getDetail: action,
            create: action,
            update: action,
            export: action,
            getAllST: action
        })
    }

    // @action
    async getAll(filter, sort, append = false) {
        this.isLoading = true
        let newObject = {};


        if (filter) {
            Object.assign(newObject, this.query, filter)

            // this.query.filter = filter;
        }

        if (sort) {
            this.sort = sort.sort;
        }
        return http.get(this.baseUrl + '?' + qs.stringify(newObject) + `&sort=["${this.sort}"]`)
            .then(res => {
                console.log('res: ', res)
                this.isLoading = false
                if (append) {
                    this.data = [...this.data, ...res.body[this.keyAccessor.data]]
                    this.maxLength = res.body[this.keyAccessor.data].total_data
                } else {
                    this.data = res.body[this.keyAccessor.data]
                    this.maxLength = res.body[this.keyAccessor.data].total_data
                }

                return res
            })
            .catch(err => {
                this.isLoading = false
                throw err
            })
    }

    // @action
    async getDetail(id) {
        this.isLoading = true

        return http.get(`${this.baseUrl}/${id}`)
            .then(res => {
                this.isLoading = false
                this.detail = res.body
                return res
            })
            .catch(err => {
                this.isLoading = false
                throw err
            })
    }

    // @action
    async create(data) {
        return http.post(this.baseUrl)
            .send(data)
    }

    // @action
    async update(id, data) {
        return http.put(`${this.baseUrl}/${id}`)
            .send(data)
    }

    // @action
    async export(data) {
        let pageSize = data.length;
        let sort = [this.sort];
        return http.post(this.baseUrl + '/export')
            .send({
                pageSize,
                sort,
                "ids": data
            })
            .then(res => {
                window.open(appConfig.apiUrl + res.body.path);
            })
    }

    // @action
    async getAllST() {
        const res = await http.get(this.baseUrl + '?' + qs.stringify(this.query))
        this.data = res.body.results.data;
    }
}
