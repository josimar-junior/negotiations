import { Negotiations, NegotiantionService, Negotiation } from '../domain/index.js';
import { NegotiationsView, MessageView, Message, InvalidDateException, DateConverter } from '../ui/index.js';
import { getNegotiationDao, Bind, getExceptionMessage } from '../util/index.js';

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

    async _init() {
        try {
            const dao = await getNegotiationDao();
            const negotiations = await dao.listAll();
            negotiations.forEach(negotiation => this._negotiations.save(negotiation));
        } catch (error) {
            this.message.text = getExceptionMessage(error);
        }
    }

    async save(event) {
        try {
            event.preventDefault();

            const negotiation = this._createNegotiation();

            const dao = await getNegotiationDao();
            await dao.save(negotiation);
            this._negotiations.save(this._createNegotiation());
            this._message.text = 'Negotiation saved successfully';
            this._cleanForm();

        } catch (error) {
            this.message.text = getExceptionMessage(error);
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

    async clear() {
        try {
            const dao = await getNegotiationDao();
            await dao.clear();
            this._negotiations.clear();
            this._message.text = 'Negotiations successfully deleted';
        } catch (error) {
            this.message.text = getExceptionMessage(error);
        }
    }

    async importNegotiations() {
        try {
            const negotiations = await this._negotiationService.getNegotiationsForThePeriod();
            negotiations.filter(newNegotiation => !this._negotiations.toArray().some(existingNegotiation =>
                newNegotiation.equals(existingNegotiation)))
                .forEach(negotiation => this._negotiations.save(negotiation));

            this._message.text = 'Negotiations imported of the period successfully';
        } catch (error) {
            this.message.text = getExceptionMessage(error);
        }
    }

}