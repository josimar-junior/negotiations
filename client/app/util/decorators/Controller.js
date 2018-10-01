System.register([], function (_export, _context) {
    "use strict";

    function controller(...selectors) {

        const elements = selectors.map(selector => document.querySelector(selector));

        return function (constructor) {
            const originalConstructor = constructor;
            const newConstructor = function () {
                return new originalConstructor(...elements);
            };
            newConstructor.prototype = originalConstructor.prototype;
            return newConstructor;
        };
    }

    _export("controller", controller);

    return {
        setters: [],
        execute: function () {}
    };
});
//# sourceMappingURL=Controller.js.map