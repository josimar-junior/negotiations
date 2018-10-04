import { ApplicationException } from '../../util/ApplicationException';

export class InvalidDateException extends ApplicationException {

    constructor() {
        super('Date must be in the format dd/mm/yyyy');
    }
}