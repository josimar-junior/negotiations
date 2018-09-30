System.register([], function (_export, _context) {
    "use strict";

    function isApplicationException(error) {
        return error instanceof ApplicationException || Object.getPrototypeOf(error) instanceof ApplicationException;
    }

    _export('isApplicationException', isApplicationException);

    function getExceptionMessage(error) {
        if (isApplicationException(error)) {
            return error.message;
        } else {
            console.log(error);
            return 'There was a problem. Contact support.';
        }
    }

    _export('getExceptionMessage', getExceptionMessage);

    return {
        setters: [],
        execute: function () {
            class ApplicationException extends Error {

                constructor(msg = '') {
                    super(msg);
                    this.name = this.constructor.name;
                }
            }

            _export('ApplicationException', ApplicationException);
        }
    };
});
//# sourceMappingURL=ApplicationException.js.map