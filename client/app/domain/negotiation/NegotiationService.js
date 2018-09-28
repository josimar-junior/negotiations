class NegotiantionService {

    constructor() {
        this._httpService = new HttpService();
    }

    getWeekNegotiations() {
        return this._httpService.get('negotiations/week')
            .then(datas => {
                return datas.map(object => new Negotiation(new Date(object.date), object.quantity, object.value));
            }, error => { throw new Error("Couldn't get week negotiations") })
    }

    getPreviousWeekNegotiations() {
        return this._httpService.get('negotiations/previous')
            .then(datas => {
                return datas.map(object => new Negotiation(new Date(object.date), object.quantity, object.value));
            }, error => { throw new Error("Couldn't get previous week negotiations") });
    }

    getDelayedWeekNegotiations() {
        return this._httpService.get('negotiations/delayed')
            .then(datas => {
                return datas.map(object => new Negotiation(new Date(object.date), object.quantity, object.value));
            }, error => { throw new Error("Couldn't get delayed week negotiations") });
    }

    getNegotiationsForThePeriod() {
        return Promise.all([
            this.getWeekNegotiations(),
            this.getPreviousWeekNegotiations(),
            this.getDelayedWeekNegotiations()
        ])
            .then(period => {
                return period.reduce((newArray, item) => newArray.concat(item), []);
            })
            .catch(error => {
                console.log(error);
                throw new Error("Couldn't get negotiations for the period");
            });
    }
}