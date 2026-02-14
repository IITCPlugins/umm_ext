type Callback = () => boolean | void;

export class Trigger {

    private handler: Callback[] = [];

    do(fct: Callback) {
        if (this.handler.includes(fct)) return;
        this.handler.push(fct);
    }

    dont(fct: Callback) {
        const index = this.handler.indexOf(fct);
        if (index === -1) {
            console.error("handler was not registerd", fct);
        }
        else {
            this.handler.splice(index, 1);
        }
    }

    trigger() {
        this.handler.some(fct => fct() === false);
    }

    clear() {
        this.handler = [];
    }
}