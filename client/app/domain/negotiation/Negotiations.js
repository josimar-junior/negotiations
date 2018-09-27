class Negotiations {

    constructor() {
        this._negotiations = [];
        Object.freeze(this);
    }

    save(negotiation) {
        this._negotiations.push(negotiation);
    }

    toArray() {
        return [].concat(this._negotiations);
    }

    get totalVolume() {
        return this._negotiations.reduce((total, negotiation) => total + negotiation.volume, 0);
    }

    clear() {
        this._negotiations.length = 0;
    }
}