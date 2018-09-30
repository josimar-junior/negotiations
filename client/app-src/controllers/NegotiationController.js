import { Negotiations, NegotiantionService, Negotiation } from '../domain/index.js';
import { NegotiationsView, MessageView, Message, InvalidDateException, DateConverter } from '../ui/index.js';
import { getNegotiationDao, Bind } from '../util/index.js';

export class NegotiationController {

    constructor() {
        const $ = document.querySelector.bind(document);

        this._inputDate = $('#date');
        this._inputQuantity = $('#quantity');
        this._inputValue = $('#value');

        this._negotiations = new Bind(new Negotiations(), new NegotiationsView('#negotiations'), 'save', 'clear');

        this._message = new Bind(new Message(), new MessageView('#messageView'), 'text');

        this._negotiationService = new NegotiantionService();

        this._init();
    }

    _init() {
        getNegotiationDao()
            .then(dao => dao.listAll())
            .then(negotiations =>
                negotiations.forEach(negotiation =>
                    this._negotiations.save(negotiation)))
            .catch(error => this._message.text = error);
    }

    save(event) {
        try {
            event.preventDefault();

            const negotiation = this._createNegotiation();

            getNegotiationDao()
                .then(dao => dao.save(negotiation))
                .then(() => {
                    this._negotiations.save(this._createNegotiation());
                    this._message.text = 'Negotiation saved successfully';
                    this._cleanForm();
                }).catch(error => this._message.text = error);

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
        getNegotiationDao()
            .then(dao => dao.clear())
            .then(() => {
                this._negotiations.clear();
                this._message.text = 'Negotiations successfully deleted';
            }).catch(error => this._message.text = error);
    }

    importNegotiations() {

        this._negotiationService.getNegotiationsForThePeriod()
            .then(negotiations => {
                negotiations.filter(newNegotiation => !this._negotiations.toArray().some(existingNegotiation =>
                    newNegotiation.equals(existingNegotiation)
                )).forEach(negotiation => this._negotiations.save(negotiation));

                this._message.text = 'Negotiations imported of the period successfully';
            }).catch(error => this._message.text = error);
    }

}