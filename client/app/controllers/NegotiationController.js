class NegotiationController {

    constructor() {
        const $ = document.querySelector.bind(document);

        this._inputDate = $('#date');
        this._inputQuantity = $('#quantity');
        this._inputValue = $('#value');

        const self = this;

        this._negotiations = new Proxy(new Negotiations(), {
            get(target, prop, receiver) {
                if (typeof(target[prop]) == typeof(Function) && ['save', 'clear'].includes(prop)) {
                    return function() {
                        console.log(`${prop} fired the trap`);
                        target[prop].apply(target, arguments);
                        self._negotiationsView.update(target);
                    }
                } else {
                    return target[prop];
                }
            }
        });

        this._negotiationsView = new NegotiationsView('#negotiations');
        this._negotiationsView.update(this._negotiations);

        this._message = new Message();
        this._messageView = new MessageView('#messageView');
        this._messageView.update(this._message);
    }

    save(event) {
        event.preventDefault();
        this._negotiations.save(this._createNegotiation());
        this._message.text = 'Negotiation saved successfully';
        this._messageView.update(this._message);
        this._cleanForm();
    }

    _createNegotiation() {
        return new Negotiation(DateConverter.toDate(this._inputDate.value),
            parseInt(this._inputQuantity.value),
            parseFloat(this._inputValue.value));
    }

    _cleanForm() {
        this._inputDate.value = '';
        this._inputQuantity.value = 1;
        this._inputValue.value = 0.0;
        this._inputDate.focus();
    }

    clear() {
        this._negotiations.clear();
        this._message.text = 'Negotiations successfully deleted';
        this._messageView.update(this._message);
    }
}