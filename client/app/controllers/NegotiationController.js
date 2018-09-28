class NegotiationController {

    constructor() {
        const $ = document.querySelector.bind(document);

        this._inputDate = $('#date');
        this._inputQuantity = $('#quantity');
        this._inputValue = $('#value');

        this._negotiations = new Bind(new Negotiations(), new NegotiationsView('#negotiations'), 'save', 'clear');

        this._message = new Bind(new Message(), new MessageView('#messageView'), 'text');

        this._negotiationService = new NegotiantionService();
    }

    save(event) {
        try {
            event.preventDefault();
            this._negotiations.save(this._createNegotiation());
            this._message.text = 'Negotiation saved successfully';
            this._cleanForm();
        } catch (error) {
            console.log(error);
            console.log(error.stack);
            if (error instanceof InvalidDateException) {
                this._message.text = error.message;
            } else {
                this._message.text = 'Error saving negotiation';
            }
        }
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

    importNegotiations() {
        this._negotiationService.getWeekNegotiations((error, negotiations) => {
            if (error) {
                this._message.text = "Couldn't get week negotiations";
                return;
            }

            negotiations.forEach(negotiation =>
                this._negotiations.save(negotiation));

            this._message.text = "Successfully imported negotiations";
        });
    }
}