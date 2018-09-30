System.register([], function (_export, _context) {
    "use strict";

    function debounce(fn, milliseconds) {
        let timer = 0;
        return () => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(), milliseconds);
        };
    }

    _export("debounce", debounce);

    return {
        setters: [],
        execute: function () {}
    };
});
//# sourceMappingURL=Debounce.js.map