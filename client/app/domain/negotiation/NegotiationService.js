class NegotiantionService {

    getWeekNegotiations(cb) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'negotiations/week');

        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
                    const negotiations = JSON.parse(xhr.responseText).map(object => new Negotiation(new Date(object.date), object.quantity, object.value));
                    cb(null, negotiations);
                } else {
                    console.log(xhr.responseText);
                    cb("Couldn't get week negotiations", null);
                }
            }
        };

        xhr.send();
    }
}