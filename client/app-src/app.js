import	'bootstrap/dist/css/bootstrap.css';
import	'bootstrap/dist/css/bootstrap-theme.css';

import	'bootstrap/js/modal.js';

import '../css/mycss.css';

import { NegotiationController } from './controllers/NegotiationController';
import { Negotiation } from './domain';

$('h1').on('click', () => alert('Was clicked'));

console.log('Function added by Bootstrap:');
console.log($('h1').modal);

const negotiation = new Negotiation(new Date(), 10, 30);
const headers = new Headers();
headers.set('Content-Type', 'application/json');

const config = {
    method: 'POST',
    headers,
    body: JSON.stringify(negotiation)
}

fetch(`${SERVICE_URL}/negotiations`, config)
    .then(() => console.log('Data uploaded successfully'));

const controller = new NegotiationController();