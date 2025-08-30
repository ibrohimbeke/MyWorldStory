// simple signals implementation
let subscriber = null;

export function signal(value) {

    const subscribers = new Set();
    return {
        get value() {
            if (subscriber) {
                subscribers.add(subscriber);
            }
            return value;
        },
        set value(newValue) {
            value = newValue;
            subscribers.forEach(sub => sub());
        }
    }
}

export function effect(fn) {
    subscriber = fn;
    fn();
    subscriber = null;
}

export function computed(fn) {
    const computedSignal = signal();
    effect(() => {
        computedSignal.value = fn();
    })
    return computedSignal;
}