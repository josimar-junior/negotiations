System.register(['./../domain/negotiation/Negotiation.js'], function (_export, _context) {
    "use strict";

    var Negotiation;
    return {
        setters: [function (_domainNegotiationNegotiationJs) {
            Negotiation = _domainNegotiationNegotiationJs.Negotiation;
        }],
        execute: function () {
            let HttpService = class HttpService {

                _handleErrors(request) {
                    if (request.ok) return request;
                    throw new Error(request.statusText);
                }

                get(url) {
                    return fetch(url).then(request => this._handleErrors(request)).then(request => request.json());
                }
            };

            _export('HttpService', HttpService);
        }
    };
});
//# sourceMappingURL=HttpService.js.map