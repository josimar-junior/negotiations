System.register(['../../util/index.js'], function (_export, _context) {
    "use strict";

    var required;
    function bindEvent(event = required('event'), selector = required('selector'), prevent = true) {

        return function (target, key, descriptor) {

            Reflect.defineMetadata('bindEvent', {
                event, selector, prevent, key
            }, Object.getPrototypeOf(target), key);

            return descriptor;
        };
    }

    _export('bindEvent', bindEvent);

    return {
        setters: [function (_utilIndexJs) {
            required = _utilIndexJs.required;
        }],
        execute: function () {}
    };
});
//# sourceMappingURL=BindEvent.js.map