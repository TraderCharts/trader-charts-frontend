import axios from "axios";

import { logError } from "./ErrorHandler";

export default class ApiClient {
    constructor(apiConf) {
        this.apiConf = apiConf;
        this.instance = axios.create();
    }

    get(apiUrl) {
        return new Promise((resolve, reject) => {
            const requestConfig = this._getRequestConfig("get", apiUrl);
            this._callAPIRequest(requestConfig, resolve, reject);
        });
    }

    post(apiUrl, payload) {
        return new Promise((resolve, reject) => {
            const requestConfig = this._getRequestConfig("post", apiUrl, payload);
            this._callAPIRequest(requestConfig, resolve, reject);
        });
    }

    put(apiUrl, payload) {
        return new Promise((resolve, reject) => {
            const requestConfig = this._getRequestConfig("put", apiUrl, payload);
            this._callAPIRequest(requestConfig, resolve, reject);
        });
    }

    patch(apiUrl, payload) {
        return new Promise((resolve, reject) => {
            const requestConfig = this._getRequestConfig("patch", apiUrl, payload);
            this._callAPIRequest(requestConfig, resolve, reject);
        });
    }

    delete(apiUrl, payload) {
        return new Promise((resolve, reject) => {
            const requestConfig = this._getRequestConfig("delete", apiUrl, payload);
            this._callAPIRequest(requestConfig, resolve, reject);
        });
    }

    _callAPIRequest(requestConfig, resolve, reject) {
        this.instance
            .request(requestConfig)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                logError(error);
                reject(error);
            });
    }

    _getRequestConfig(requestMethod, apiUrl, payload) {
        let urlDomain;
        switch (process.env.REACT_APP_ENV) {
            case "production":
                urlDomain = process.env.REACT_APP_PUBLIC_BACKEND_API;
                break;
            default:
                urlDomain = process.env.REACT_APP_BACKEND_API;
                break;
        }
        const auth = JSON.parse(localStorage.getItem("auth"));
        const headers = {
            "Content-Type": "application/json",
        };
        if (auth) {
            headers.Authorization = `Bearer ${auth.accessToken}`;
        }
        const requestConfig = {
            url: urlDomain + apiUrl,
            method: requestMethod,
            headers,
        };

        if (payload) {
            requestConfig.data = payload;
        }

        return requestConfig;
    }
}
