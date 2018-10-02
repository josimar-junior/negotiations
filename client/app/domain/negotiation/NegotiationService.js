System.register(['../../util/HttpService.js', './Negotiation.js', '../../util/ApplicationException.js'], function (_export, _context) {
    "use strict";

    var HttpService, Negotiation, ApplicationException;
    return {
        setters: [function (_utilHttpServiceJs) {
            HttpService = _utilHttpServiceJs.HttpService;
        }, function (_NegotiationJs) {
            Negotiation = _NegotiationJs.Negotiation;
        }, function (_utilApplicationExceptionJs) {
            ApplicationException = _utilApplicationExceptionJs.ApplicationException;
        }],
        execute: function () {
            function _asyncToGenerator(fn) {
                return function () {
                    var gen = fn.apply(this, arguments);
                    return new Promise(function (resolve, reject) {
                        function step(key, arg) {
                            try {
                                var info = gen[key](arg);
                                var value = info.value;
                            } catch (error) {
                                reject(error);
                                return;
                            }

                            if (info.done) {
                                resolve(value);
                            } else {
                                return Promise.resolve(value).then(function (value) {
                                    step("next", value);
                                }, function (err) {
                                    step("throw", err);
                                });
                            }
                        }

                        return step("next");
                    });
                };
            }

            let NegotiantionService = class NegotiantionService {

                constructor() {
                    this._httpService = new HttpService();
                }

                getWeekNegotiations() {
                    return this._httpService.get('negotiations/week').then(datas => datas.map(object => new Negotiation(new Date(object.date), object.quantity, object.value)), error => {
                        throw new ApplicationException("Couldn't get week negotiations");
                    });
                }

                getPreviousWeekNegotiations() {
                    return this._httpService.get('negotiations/previous').then(datas => datas.map(object => new Negotiation(new Date(object.date), object.quantity, object.value)), error => {
                        throw new ApplicationException("Couldn't get previous week negotiations");
                    });
                }

                getDelayedWeekNegotiations() {
                    return this._httpService.get('negotiations/delayed').then(datas => datas.map(object => new Negotiation(new Date(object.date), object.quantity, object.value)), error => {
                        throw new ApplicationException("Couldn't get delayed week negotiations");
                    });
                }

                getNegotiationsForThePeriod() {
                    var _this = this;

                    return _asyncToGenerator(function* () {
                        try {
                            let period = yield Promise.all([_this.getWeekNegotiations(), _this.getPreviousWeekNegotiations(), _this.getDelayedWeekNegotiations()]);
                            return period.reduce(function (newArray, item) {
                                return newArray.concat(item);
                            }, []).sort(function (object1, object2) {
                                return object2.date.getTime() - object1.date.getTime();
                            });
                        } catch (error) {
                            console.log(err);
                            throw new ApplicationException("Couldn't get negotiations for the period");
                        }
                    })();
                }
            };

            _export('NegotiantionService', NegotiantionService);
        }
    };
});
//# sourceMappingURL=NegotiationService.js.map