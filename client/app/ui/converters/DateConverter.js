class DateConverter {

    constructor() {
        throw new Error("This class can't be instantiated");
    }

    static toText(date) {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    static toDate(text) {
        if(!/^\d{4}-\d{2}-\d{2}$/.test(text))
            throw new Error('Date must be in the format aaaa-mm-dd'); 

        return new Date(...text.split('-').map((item, index) => item - index % 2));
    }
}