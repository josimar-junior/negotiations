import { Negotiations, Negotiation } from '../domain';
import { NegotiationsView, MessageView, Message, DateConverter } from '../ui';
import { getNegotiationDao, Bind, getExceptionMessage, debounce, controller, bindEvent } from '../util';

@controller('#date', '#quantity', '#value')
export class NegotiationController {

    constructor(_inputDate, _inputQuantity, _inputValue) {

        Object.assign(this, { _inputDate, _inputQuantity, _inputValue });

        this._negotiations = new Bind(new Negotiations(), new NegotiationsView('#negotiations'), 'save', 'clear');

        this._message = new Bind(new Message(), new MessageView('#messageView'), 'text');

        this._init();
    }

    async _init() {
        try {
            const dao = await getNegotiationDao();
            const negotiations = await dao.listAll();
            negotiations.forEach(negotiation => this._negotiations.save(negotiation));
        } catch (error) {
            this._message.text = getExceptionMessage(error);
        }
    }

    @bindEvent('submit', '.form')
    @debounce()
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
            this._message.text = getExceptionMessage(error);
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

    @bindEvent('click', '#btn-clear')
    async clear() {
        try {
            const dao = await getNegotiationDao();
            await dao.clear();
            this._negotiations.clear();
            this._message.text = 'Negotiations successfully deleted';
        } catch (error) {
            this._message.text = getExceptionMessage(error);
        }
    }

    @bindEvent('click', '#btn-import')
    @debounce()
    async importNegotiations() {
        try {

            const { NegotiationService } = await import('../domain/negotiation/NegotiationService');

            const negotiationService = new NegotiationService();
            
            const negotiations = await negotiationService.getNegotiationsForThePeriod();
            negotiations.filter(newNegotiation => !this._negotiations.toArray().some(existingNegotiation =>
                newNegotiation.equals(existingNegotiation)))
                .forEach(negotiation => this._negotiations.save(negotiation));

            this._message.text = 'Negotiations imported of the period successfully';
        } catch (error) {
            this._message.text = getExceptionMessage(error);
        }
    }

}