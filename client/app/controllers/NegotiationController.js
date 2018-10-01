System.register(['../domain/index.js', '../ui/index.js', '../util/index.js'], function (_export, _context) {
    "use strict";

    var Negotiations, NegotiantionService, Negotiation, NegotiationsView, MessageView, Message, DateConverter, getNegotiationDao, Bind, getExceptionMessage, debounce, controller;
    return {
        setters: [function (_domainIndexJs) {
            Negotiations = _domainIndexJs.Negotiations;
            NegotiantionService = _domainIndexJs.NegotiantionService;
            Negotiation = _domainIndexJs.Negotiation;
        }, function (_uiIndexJs) {
            NegotiationsView = _uiIndexJs.NegotiationsView;
            MessageView = _uiIndexJs.MessageView;
            Message = _uiIndexJs.Message;
            DateConverter = _uiIndexJs.DateConverter;
        }, function (_utilIndexJs) {
            getNegotiationDao = _utilIndexJs.getNegotiationDao;
            Bind = _utilIndexJs.Bind;
            getExceptionMessage = _utilIndexJs.getExceptionMessage;
            debounce = _utilIndexJs.debounce;
            controller = _utilIndexJs.controller;
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

            function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
                var desc = {};
                Object['ke' + 'ys'](descriptor).forEach(function (key) {
                    desc[key] = descriptor[key];
                });
                desc.enumerable = !!desc.enumerable;
                desc.configurable = !!desc.configurable;

                if ('value' in desc || desc.initializer) {
                    desc.writable = true;
                }

                desc = decorators.slice().reverse().reduce(function (desc, decorator) {
                    return decorator(target, property, desc) || desc;
                }, desc);

                if (context && desc.initializer !== void 0) {
                    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
                    desc.initializer = undefined;
                }

                if (desc.initializer === void 0) {
                    Object['define' + 'Property'](target, property, desc);
                    desc = null;
                }

                return desc;
            }

            var _dec, _dec2, _class, _desc, _value, _class2;

            let NegotiationController = (_dec = controller('#date', '#quantity', '#value'), _dec2 = debounce(), _dec(_class = (_class2 = class NegotiationController {

                constructor(_inputDate, _inputQuantity, _inputValue) {

                    Object.assign(this, { _inputDate, _inputQuantity, _inputValue });

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
                            _this._message.text = getExceptionMessage(error);
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
                            _this2._message.text = getExceptionMessage(error);
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
                            _this3._message.text = getExceptionMessage(error);
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
                            _this4._message.text = getExceptionMessage(error);
                        }
                    })();
                }

            }, (_applyDecoratedDescriptor(_class2.prototype, 'importNegotiations', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'importNegotiations'), _class2.prototype)), _class2)) || _class);

            _export('NegotiationController', NegotiationController);
        }
    };
});
//# sourceMappingURL=NegotiationController.js.map