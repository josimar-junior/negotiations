import { NegotiationController } from './controllers/NegotiationController.js';
import { debounce } from './util/index.js';

const controller = new NegotiationController();
const $ = document.querySelector.bind(document);

$('.form').addEventListener('submit', controller.save.bind(controller));
$('#btn-clear').addEventListener('click', controller.clear.bind(controller));
$('#btn-import').addEventListener('click', debounce(() => controller.importNegotiations(), 1000));