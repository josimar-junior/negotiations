System.register([], function (_export, _context) {
    "use strict";

    return {
        setters: [],
        execute: function () {
            let Negotiations = class Negotiations {

                constructor() {
                    this._negotiations = [];
                    Object.freeze(this);
                }

                save(negotiation) {
                    this._negotiations.push(negotiation);
                }

                toArray() {
                    return [].concat(this._negotiations);
                }

                get totalVolume() {
                    return this._negotiations.reduce((total, negotiation) => total + negotiation.volume, 0);
                }

                clear() {
                    this._negotiations.length = 0;
                }
            };

            _export("Negotiations", Negotiations);
        }
    };
});
//# sourceMappingURL=Negotiations.js.map