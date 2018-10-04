import { ConnectionFactory } from './ConnectionFactory';
import { NegotiationDao } from '../domain/negotiation/NegotiationDao';

export async function getNegotiationDao() {
    let connection = await ConnectionFactory.getConnection();
    return new NegotiationDao(connection);
}