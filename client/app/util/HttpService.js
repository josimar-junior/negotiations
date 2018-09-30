System.register(['./../domain/negotiation/Negotiation.js'], function (_export, _context) {
    "use strict";

    var Negotiation;
    return {
        setters: [function (_domainNegotiationNegotiationJs) {
            Negotiation = _domainNegotiationNegotiationJs.Negotiation;
        }],
        execute: function () {
            class HttpService {
                get(url) {
                    return new Promise((resolve, reject) => {
                        const xhr = new XMLHttpRequest();
                        xhr.open('GET', url);

                        xhr.onreadystatechange = () => {
                            if (xhr.readyState == 4) {
                                if (xhr.status == 200) {
                                    const negotiations = JSON.parse(xhr.responseText).map(object => new Negotiation(new Date(object.date), object.quantity, object.value));
                                    resolve(negotiations);
                                } else {
                                    console.log(xhr.responseText);
                                    reject("Couldn't get week negotiations");
                                }
                            }
                        };

                        xhr.send();
                    });
                }
            }

            _export('HttpService', HttpService);
        }
    };
});
//# sourceMappingURL=HttpService.js.map