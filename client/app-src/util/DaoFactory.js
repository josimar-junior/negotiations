import { ConnectionFactory } from './ConnectionFactory.js';
import { NegotiationDao } from '../domain/negotiation/NegotiationDao.js';

export function getNegotiationDao() {
    return ConnectionFactory.getConnection().then(connection => new NegotiationDao(connection));
}