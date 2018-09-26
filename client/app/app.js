
let controller = new NegotiationController();

document.querySelector('.form').addEventListener('submit', controller.save.bind(controller));