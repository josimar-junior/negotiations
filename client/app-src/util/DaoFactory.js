import { ConnectionFactory } from './ConnectionFactory.js';
import { NegotiationDao } from '../domain/negotiation/NegotiationDao.js';

export async function getNegotiationDao() {
    let connection = await ConnectionFactory.getConnection();
    return new NegotiationDao(connection);
}