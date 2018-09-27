class Negotiation {

    constructor(_date, _quantity, _value) {
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
}