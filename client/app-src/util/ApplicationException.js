export class ApplicationException extends Error {

    constructor(msg = '') {
        super(msg);
        this.name = this.constructor.name;
    }
}

export function isApplicationException(error) {
    return error instanceof ApplicationException || Object.getPrototypeOf(error) instanceof ApplicationException;
}

export function getExceptionMessage(error) {
    if (isApplicationException(error)) {
        return error.message;
    } else {
        console.log(error);
        return 'There was a problem. Contact support.';
    }
}