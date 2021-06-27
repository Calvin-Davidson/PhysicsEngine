class EventSystem {

    listeners : Array<any>;

    constructor() {
        this.listeners = [];
    }


    public AddListener(methode) {
        this.listeners.push(methode);
    }

    public RemoveListener(methode) {
        this.listeners = this.listeners.filter(obj => obj !== methode);
    }

    public Invoke(...data) {
        if (this.listeners === undefined || this.listeners.length === 0) return;

        this.listeners.forEach(value => value(data));
    }
}