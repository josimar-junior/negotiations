import { NegotiationController } from './controllers/NegotiationController.js';
import { Negotiation } from './domain/index.js';

const negotiation = new Negotiation(new Date(), 10, 30);
const headers = new Headers();
headers.set('Content-Type', 'application/json');

const config = {
    method: 'POST',
    headers,
    body: JSON.stringify(negotiation)
}

fetch('http://localhost:3000/negotiations', config)
    .then(() => console.log('Data uploaded successfully'));

const controller = new NegotiationController();