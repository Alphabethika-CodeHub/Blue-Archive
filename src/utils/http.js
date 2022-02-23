import superagent from "superagent";
import { appConfig } from "../config/app";
import { store } from "./useStore";

export const http = {
    get: (url, opts = {}) => {
        let req = superagent.get(appConfig.apiUrl + url);
        if (store.accessToken) {
            req = req.set('Authorization', 'Bearer ' + store.accessToken);
        } else {
            req = req.set('Authorization', 'Bearer ' + localStorage.getItem("access_token"));
        }
        return req;
    },
    post: (url, opts) => {
        let req = superagent.post(appConfig.apiUrl + url);
        if (store.accessToken) {
            req = req.set('Authorization', 'Bearer ' + store.accessToken);
        } else {
            req = req.set('Authorization', 'Bearer ' + localStorage.getItem("access_token"));
        }
        return req;
    },
    put: (url, opts) => {
        let req = superagent.put(appConfig.apiUrl + url);
        if (store.accessToken) {
            req = req.set('Authorization', 'Bearer ' + store.accessToken);
        } else {
            req = req.set('Authorization', 'Bearer ' + localStorage.getItem("access_token"));
        }
        return req;
    },
    del: (url, opts) => {
        let req = superagent.del(appConfig.apiUrl + url);
        if (store.accessToken) {
            req = req.set('Authorization', 'Bearer ' + store.accessToken);
        }
        return req;
    },
    upload: (file) => {
        let request = superagent
            .post(appConfig.apiUrl + '/files')
            .attach('file', file);

        if (store.accessToken) {
            request = request.set('Authorization', 'Bearer ' + store.accessToken);
        } else {
            request = request.set('Authorization', 'Bearer ' + localStorage.getItem("access_token"));
        }

        return request;
    },
    uploadAntd: (args) => {
        const file = args.file;
        let request = http.upload(file);

        if (store.accessToken) {
            request = request.set('Authorization', 'Bearer ' + store.accessToken);
        } else {
            request = request.set('Authorization', 'Bearer ' + localStorage.getItem("access_token"));
        }

        request
            .on('progress', event => {
                args.onProgress(event);
            })
            .then(it => {
                args.onSuccess(it);
            }).catch(err => {
                args.onError(err);
            });

        return request;
    }
};
