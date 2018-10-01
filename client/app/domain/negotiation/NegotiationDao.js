System.register(['./Negotiation.js'], function (_export, _context) {
    "use strict";

    var Negotiation;
    return {
        setters: [function (_NegotiationJs) {
            Negotiation = _NegotiationJs.Negotiation;
        }],
        execute: function () {
            let NegotiationDao = class NegotiationDao {

                constructor(connection) {
                    this._connection = connection;
                    this._store = 'negotiations';
                }

                save(negotiation) {
                    return new Promise((resolve, reject) => {
                        const request = this._connection.transaction([this._store], 'readwrite').objectStore(this._store).add(negotiation);

                        request.onsuccess = e => resolve();
                        request.onerror = e => {
                            console.log(e.target.error);
                            reject('Error saving negotiation');
                        };
                    });
                }

                listAll() {
                    return new Promise((resolve, reject) => {
                        const negotiatons = [];

                        const cursor = this._connection.transaction([this._store], 'readwrite').objectStore(this._store).openCursor();

                        cursor.onsuccess = e => {
                            const current = e.target.result;
                            if (current) {
                                const negotiation = new Negotiation(current.value._date, current.value._quantity, current.value._value);
                                negotiatons.push(negotiation);
                                current.continue();
                            } else {
                                resolve(negotiatons);
                            }
                        };

                        cursor.onerror = e => {
                            console.log(e.target.error);
                            reject('Error listing negotiations');
                        };
                    });
                }

                clear() {
                    return new Promise((resolve, reject) => {
                        const request = this._connection.transaction([this._store], 'readwrite').objectStore(this._store).clear();

                        request.onsuccess = e => resolve();
                        request.onerror = e => {
                            console.log(e.target.error);
                            reject('Error deleting the negotiations');
                        };
                    });
                }
            };

            _export('NegotiationDao', NegotiationDao);
        }
    };
});
//# sourceMappingURL=NegotiationDao.js.map