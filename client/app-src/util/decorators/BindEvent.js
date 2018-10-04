import { required } from '../../util/index.js'

export function bindEvent(event = required('event'),
    selector = required('selector'),
    prevent = true) {

    return function (target, key, descriptor) {

        Reflect.defineMetadata('bindEvent', {
            event, selector, prevent, key
        }, Object.getPrototypeOf(target), key);

        return descriptor;
    }
}