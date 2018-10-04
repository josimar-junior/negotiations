import { Negotiation } from './../domain/negotiation/Negotiation.js';

export class HttpService {

    _handleErrors(request) {
        if(request.ok)
            return request;
        throw new Error(request.statusText);
    }

    get(url) {
        return fetch(url)
            .then(request => this._handleErrors(request))
            .then(request => request.json());
    }
}