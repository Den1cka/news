class AlertService {
    constructor(container) {
        this.container = container;
    }

    clearContainer() {
        const container = document.getElementById(this.container);

        while (container.hasChildNodes()) {
            container.removeChild(container.firstChild);
        }
    }

    displayLoading(loadingMessage) {
        const alert = `
            <div class='alert alert-primary'>
                ${loadingMessage}
            </div>`;

        document.getElementById(this.container).innerHTML += alert;
    }

    displayException(exceptionMessage) {
        const alert = `
            <div class='alert alert-danger'>
                ${exceptionMessage}
            </div>`;

        document.getElementById(this.container).innerHTML += alert;
    }

    displayCompletion(completionMessage) {
        const alert = `
            <div class='alert alert-success'>
                ${completionMessage}
            </div>`;

        document.getElementById(this.container).innerHTML += alert;
    }
}

export default AlertService;
