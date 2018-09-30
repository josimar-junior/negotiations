import { Negotiation } from './../domain/negotiation/Negotiation.js';

export class HttpService {
    get(url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        const negotiations = JSON.parse(xhr.responseText).map(object => new Negotiation(new Date(object.date), object.quantity, object.value));
                        resolve(negotiations);
                    } else {
                        console.log(xhr.responseText);
                        reject("Couldn't get week negotiations");
                    }
                }
            };

            xhr.send();
        });
    }
}