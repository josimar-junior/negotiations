System.register([], function (_export, _context) {
    "use strict";

    return {
        setters: [],
        execute: function () {
            class ProxyFactory {

                static create(object, props, traps) {

                    return new Proxy(object, {
                        get(target, prop, receiver) {
                            if (ProxyFactory._isFunction(target[prop]) && props.includes(prop)) {
                                return function () {
                                    console.log(`${prop} fired the trap`);
                                    target[prop].apply(target, arguments);
                                    traps(target);
                                };
                            } else {
                                return target[prop];
                            }
                        },
                        set(target, prop, value, receiver) {
                            const updated = Reflect.set(target, prop, value);
                            if (props.includes(prop)) traps(target);

                            return updated;
                        }
                    });
                }

                static _isFunction(fn) {
                    return typeof fn == typeof Function;
                }
            }

            _export("ProxyFactory", ProxyFactory);
        }
    };
});
//# sourceMappingURL=ProxyFactory.js.map