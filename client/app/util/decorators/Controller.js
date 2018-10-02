System.register([], function (_export, _context) {
    "use strict";

    function controller(...selectors) {

        const elements = selectors.map(selector => document.querySelector(selector));

        return function (constructor) {
            const originalConstructor = constructor;
            const newConstructor = function () {
                const instance = new originalConstructor(...elements);
                Object.getOwnPropertyNames(originalConstructor.prototype).forEach(property => {
                    if (Reflect.hasMetadata('bindEvent', instance, property)) {
                        associateEvent(instance, Reflect.getMetadata('bindEvent', instance, property));
                    }
                });
            };
            newConstructor.prototype = originalConstructor.prototype;
            return newConstructor;
        };
    }

    _export('controller', controller);

    function associateEvent(instance, metadata) {
        document.querySelector(metadata.selector).addEventListener(metadata.event, event => {
            if (metadata.prevent) event.preventDefault();
            instance[metadata.key](event);
        });
    }
    return {
        setters: [],
        execute: function () {}
    };
});
//# sourceMappingURL=Controller.js.map