System.register(['../domain/index.js', '../ui/index.js', '../util/index.js'], function (_export, _context) {
    "use strict";

    var Negotiations, NegotiantionService, Negotiation, NegotiationsView, MessageView, Message, InvalidDateException, DateConverter, getNegotiationDao, Bind, getExceptionMessage;

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

    return {
        setters: [function (_domainIndexJs) {
            Negotiations = _domainIndexJs.Negotiations;
            NegotiantionService = _domainIndexJs.NegotiantionService;
            Negotiation = _domainIndexJs.Negotiation;
        }, function (_uiIndexJs) {
            NegotiationsView = _uiIndexJs.NegotiationsView;
            MessageView = _uiIndexJs.MessageView;
            Message = _uiIndexJs.Message;
            InvalidDateException = _uiIndexJs.InvalidDateException;
            DateConverter = _uiIndexJs.DateConverter;
        }, function (_utilIndexJs) {
            getNegotiationDao = _utilIndexJs.getNegotiationDao;
            Bind = _utilIndexJs.Bind;
            getExceptionMessage = _utilIndexJs.getExceptionMessage;
        }],
        execute: function () {
            class NegotiationController {

                constructor() {
                    const $ = document.querySelector.bind(document);

                    this._inputDate = $('#date');
                    this._inputQuantity = $('#quantity');
                    this._inputValue = $('#value');

                    this._negotiations = new Bind(new Negotiations(), new NegotiationsView('#negotiations'), 'save', 'clear');

                    this._message = new Bind(new Message(), new MessageView('#messageView'), 'text');

                    this._negotiationService = new NegotiantionService();

                    this._init();
                }

                _init() {
                    var _this = this;

                    return _asyncToGenerator(function* () {
                        try {
                            const dao = yield getNegotiationDao();
                            const negotiations = yield dao.listAll();
                            negotiations.forEach(function (negotiation) {
                                return _this._negotiations.save(negotiation);
                            });
                        } catch (error) {
                            _this.message.text = getExceptionMessage(error);
                        }
                    })();
                }

                save(event) {
                    var _this2 = this;

                    return _asyncToGenerator(function* () {
                        try {
                            event.preventDefault();

                            const negotiation = _this2._createNegotiation();

                            const dao = yield getNegotiationDao();
                            yield dao.save(negotiation);
                            _this2._negotiations.save(_this2._createNegotiation());
                            _this2._message.text = 'Negotiation saved successfully';
                            _this2._cleanForm();
                        } catch (error) {
                            _this2.message.text = getExceptionMessage(error);
                        }
                    })();
                }

                _createNegotiation() {
                    return new Negotiation(DateConverter.toDate(this._inputDate.value), parseInt(this._inputQuantity.value), parseFloat(this._inputValue.value));
                }

                _cleanForm() {
                    this._inputDate.value = '';
                    this._inputQuantity.value = 1;
                    this._inputValue.value = 0.0;
                    this._inputDate.focus();
                }

                clear() {
                    var _this3 = this;

                    return _asyncToGenerator(function* () {
                        try {
                            const dao = yield getNegotiationDao();
                            yield dao.clear();
                            _this3._negotiations.clear();
                            _this3._message.text = 'Negotiations successfully deleted';
                        } catch (error) {
                            _this3.message.text = getExceptionMessage(error);
                        }
                    })();
                }

                importNegotiations() {
                    var _this4 = this;

                    return _asyncToGenerator(function* () {
                        try {
                            const negotiations = yield _this4._negotiationService.getNegotiationsForThePeriod();
                            negotiations.filter(function (newNegotiation) {
                                return !_this4._negotiations.toArray().some(function (existingNegotiation) {
                                    return newNegotiation.equals(existingNegotiation);
                                });
                            }).forEach(function (negotiation) {
                                return _this4._negotiations.save(negotiation);
                            });

                            _this4._message.text = 'Negotiations imported of the period successfully';
                        } catch (error) {
                            _this4.message.text = getExceptionMessage(error);
                        }
                    })();
                }

            }

            _export('NegotiationController', NegotiationController);
        }
    };
});
//# sourceMappingURL=NegotiationController.js.map