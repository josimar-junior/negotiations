class NegotiationController {

    constructor() {
        const $ = document.querySelector.bind(document);

        this._inputDate = $('#date');
        this._inputQuantity = $('#quantity');
        this._inputValue = $('#value');

        const self = this;

        this._negotiations = ProxyFactory.create(new Negotiations(), ['save', 'clear'], model => this._negotiationsView.update(model));

        this._negotiationsView = new NegotiationsView('#negotiations');
        this._negotiationsView.update(this._negotiations);

        this._message = ProxyFactory.create(new Message(), ['text'], model => this._messageView.update(model));
        this._messageView = new MessageView('#messageView');
        this._messageView.update(this._message);
    }

    save(event) {
        event.preventDefault();
        this._negotiations.save(this._createNegotiation());
        this._message.text = 'Negotiation saved successfully';
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
    }
}