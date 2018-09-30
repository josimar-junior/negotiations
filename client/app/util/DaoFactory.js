System.register(['./ConnectionFactory.js', '../domain/negotiation/NegotiationDao.js'], function (_export, _context) {
    "use strict";

    var ConnectionFactory, NegotiationDao;
    function getNegotiationDao() {
        return ConnectionFactory.getConnection().then(connection => new NegotiationDao(connection));
    }

    _export('getNegotiationDao', getNegotiationDao);

    return {
        setters: [function (_ConnectionFactoryJs) {
            ConnectionFactory = _ConnectionFactoryJs.ConnectionFactory;
        }, function (_domainNegotiationNegotiationDaoJs) {
            NegotiationDao = _domainNegotiationNegotiationDaoJs.NegotiationDao;
        }],
        execute: function () {}
    };
});
//# sourceMappingURL=DaoFactory.js.map