class DatasetProcessor {
    constructor(container, url, loadingMessage, exceptionMessage) {
        this.container = container;
        this.url = url;
        this.loadingMessage = loadingMessage;
        this.exceptionMessage = exceptionMessage;
    }

    clearContainer() {
        const container = document.getElementById(this.container);

        while (container.hasChildNodes()) {
            container.removeChild(container.firstChild);
        }
    }

    displayLoading() {
        this.clearContainer();

        const alert = `
            <div class='alert alert-primary'>
                ${this.loadingMessage}
            </div>`;

        document.getElementById(this.container).innerHTML = alert;
    }

    displayException() {
        this.clearContainer();

        const alert = `
            <div class='alert alert-danger'>
                ${this.exceptionMessage}
            </div>`;

        document.getElementById(this.container).innerHTML = alert;
    }

    displayDataset(dataset) {
        this.clearContainer();

        const cards = document.createElement(`div`);
        cards.classList.add(`card-columns`);

        for (const item of dataset) {
            const card = this.displayDatasetItem(item);
            cards.appendChild(card);
        }

        document.getElementById(this.container).appendChild(cards);
    }

    // This function is called from base class, it cannot be static.
    // eslint-disable-next-line class-methods-use-this
    displayDatasetItem() {
        throw new Error(`Function is abstract and not allowed for direct usage!`);
    }

    // This function is called from base class, it cannot be static.
    // eslint-disable-next-line class-methods-use-this
    loadDatasetFromJson() {
        throw new Error(`Function is abstract and not allowed for direct usage!`);
    }

    loadDataset() {
        this.displayLoading();

        fetch(this.url)
            .then(response => response.json())
            .then((json) => {
                const dataset = this.loadDatasetFromJson(json);
                this.displayDataset(dataset);
            })
            .catch(() => {
                this.displayException();
            });
    }
}

export default DatasetProcessor;
