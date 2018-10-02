import {required} from '../../util/index.js';

export class Negotiation {

    constructor(_date = required('date'), _quantity = required('quantity'), _value = required('value')) {
        Object.assign(this, {_quantity, _value});
        this._date = new Date(_date.getTime())
        Object.freeze(this);
    }

    get date() {
        return new Date(this._date.getTime());
    }

    get quantity() {
        return this._quantity;
    }

    get value() {
        return this._value;
    }

    get volume() {
        return this._quantity * this._value;
    }

    equals(negotiation) {
        return JSON.stringify(this) == JSON.stringify(negotiation);
    }
}