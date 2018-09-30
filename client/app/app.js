System.register(['./controllers/NegotiationController.js', './util/index.js'], function (_export, _context) {
  "use strict";

  var NegotiationController, debounce;
  return {
    setters: [function (_controllersNegotiationControllerJs) {
      NegotiationController = _controllersNegotiationControllerJs.NegotiationController;
    }, function (_utilIndexJs) {
      debounce = _utilIndexJs.debounce;
    }],
    execute: function () {

      const controller = new NegotiationController();
      const $ = document.querySelector.bind(document);

      $('.form').addEventListener('submit', controller.save.bind(controller));
      $('#btn-clear').addEventListener('click', controller.clear.bind(controller));
      $('#btn-import').addEventListener('click', debounce(() => controller.importNegotiations(), 1000));
    }
  };
});
//# sourceMappingURL=app.js.map