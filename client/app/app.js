System.register(['./controllers/NegotiationController.js', './domain/index.js'], function (_export, _context) {
    "use strict";

    var NegotiationController, Negotiation;
    return {
        setters: [function (_controllersNegotiationControllerJs) {
            NegotiationController = _controllersNegotiationControllerJs.NegotiationController;
        }, function (_domainIndexJs) {
            Negotiation = _domainIndexJs.Negotiation;
        }],
        execute: function () {

            const negotiation = new Negotiation(new Date(), 10, 30);
            const headers = new Headers();
            headers.set('Content-Type', 'application/json');

            const config = {
                method: 'POST',
                headers,
                body: JSON.stringify(negotiation)
            };

            fetch('/negotiations', config).then(() => console.log('Data uploaded successfully'));

            const controller = new NegotiationController();
        }
    };
});
//# sourceMappingURL=app.js.map