import { HttpService } from '../../util/HttpService.js';
import { Negotiation } from './Negotiation.js';
import { ApplicationException } from '../../util/ApplicationException.js';

export class NegotiantionService {

    constructor() {
        this._httpService = new HttpService();
    }

    getWeekNegotiations() {
        return this._httpService.get('negotiations/weeks')
            .then(datas =>
                datas.map(object => new Negotiation(new Date(object.date), object.quantity, object.value))
                , error => { throw new ApplicationException("Couldn't get week negotiations") })
    }

    getPreviousWeekNegotiations() {
        return this._httpService.get('negotiations/previous')
            .then(datas =>
                datas.map(object => new Negotiation(new Date(object.date), object.quantity, object.value))
                , error => { throw new ApplicationException("Couldn't get previous week negotiations") });
    }

    getDelayedWeekNegotiations() {
        return this._httpService.get('negotiations/delayed')
            .then(datas =>
                datas.map(object => new Negotiation(new Date(object.date), object.quantity, object.value))
                , error => { throw new ApplicationException("Couldn't get delayed week negotiations") });
    }

    async getNegotiationsForThePeriod() {
        try {
            let period = await Promise.all([
                this.getWeekNegotiations(),
                this.getPreviousWeekNegotiations(),
                this.getDelayedWeekNegotiations()
            ]);
            return period.reduce((newArray, item) =>
                newArray.concat(item), [])
                .sort((object1, object2) => object2.date.getTime() - object1.date.getTime());
        } catch (error) {
            console.log(err);
            throw new ApplicationException("Couldn't get negotiations for the period");
        }
    }
}