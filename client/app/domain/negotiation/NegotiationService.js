System.register(['../../util/HttpService.js', './Negotiation.js'], function (_export, _context) {
    "use strict";

    var HttpService, Negotiation;
    return {
        setters: [function (_utilHttpServiceJs) {
            HttpService = _utilHttpServiceJs.HttpService;
        }, function (_NegotiationJs) {
            Negotiation = _NegotiationJs.Negotiation;
        }],
        execute: function () {
            class NegotiantionService {

                constructor() {
                    this._httpService = new HttpService();
                }

                getWeekNegotiations() {
                    return this._httpService.get('negotiations/week').then(datas => datas.map(object => new Negotiation(new Date(object.date), object.quantity, object.value)), error => {
                        throw new Error("Couldn't get week negotiations");
                    });
                }

                getPreviousWeekNegotiations() {
                    return this._httpService.get('negotiations/previous').then(datas => datas.map(object => new Negotiation(new Date(object.date), object.quantity, object.value)), error => {
                        throw new Error("Couldn't get previous week negotiations");
                    });
                }

                getDelayedWeekNegotiations() {
                    return this._httpService.get('negotiations/delayed').then(datas => datas.map(object => new Negotiation(new Date(object.date), object.quantity, object.value)), error => {
                        throw new Error("Couldn't get delayed week negotiations");
                    });
                }

                getNegotiationsForThePeriod() {
                    return Promise.all([this.getWeekNegotiations(), this.getPreviousWeekNegotiations(), this.getDelayedWeekNegotiations()]).then(period => period.reduce((newArray, item) => newArray.concat(item), []).sort((object1, object2) => object2.date.getTime() - object1.date.getTime())).catch(error => {
                        console.log(error);
                        throw new Error("Couldn't get negotiations for the period");
                    });
                }
            }

            _export('NegotiantionService', NegotiantionService);
        }
    };
});
//# sourceMappingURL=NegotiationService.js.map