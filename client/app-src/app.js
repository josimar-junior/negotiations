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

fetch('/negotiations', config)
    .then(() => console.log('Data uploaded successfully'));

const controller = new NegotiationController();
const $ = document.querySelector.bind(document);

$('.form').addEventListener('submit', controller.save.bind(controller));
$('#btn-clear').addEventListener('click', controller.clear.bind(controller));
$('#btn-import').addEventListener('click', controller.importNegotiations.bind(controller));