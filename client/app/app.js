const controller = new NegotiationController();

document.querySelector('.form').addEventListener('submit', controller.save.bind(controller));

document.querySelector('#btn-clear').addEventListener('click', controller.clear.bind(controller));