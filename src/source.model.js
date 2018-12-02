import EventHandler from "./eventhandler.js";

class SourceModel {
    constructor(api) {
        this.onGetDefaultBefore = new EventHandler(this);
        this.onGetDefault = new EventHandler(this);
        this.onGetDefaultException = new EventHandler(this);
        this.onGetDefaultAfter = new EventHandler(this);

        this.api = api;

        this.sources = [];
    }

    getDefault() {
        this.onGetDefaultBefore.notify();
        this.sources = [];

        this.api.get()
            .then((sources) => {
                this.onGetDefault.notify(sources);
            })
            .catch(() => {
                this.onGetDefaultException.notify();
            })
            .finally(() => {
                this.onGetDefaultAfter.notify();
            });
    }
}

export default SourceModel;
