class NegotiationController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputDate = $('#date');
        this._inputQuantity = $('#quantity');
        this._inputValue = $('#value');
        this._negotiations = new Negotiations();
        this._negotiationsView = new NegotiationsView('.negotiations');
        this._negotiationsView.update(this._negotiations);
    }

    save(event) {
        event.preventDefault();
        this._negotiations.save(this._createNegotiation());
        this._negotiationsView.update(this._negotiations);
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
}