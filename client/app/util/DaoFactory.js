
function getNegotiationDao() {
    return ConnectionFactory.getConnection().then(connection => new NegotiationDao(connection));
}