class InterfaceService {
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
        this.clearContainer();

        const alert = `
            <div class='alert alert-primary'>
                ${loadingMessage}
            </div>`;

        document.getElementById(this.container).innerHTML = alert;
    }

    displayException(exceptionMessage) {
        this.clearContainer();

        const alert = `
            <div class='alert alert-danger'>
                ${exceptionMessage}
            </div>`;

        document.getElementById(this.container).innerHTML = alert;
    }
}

export default InterfaceService;
