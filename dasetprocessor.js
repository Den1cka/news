class DatasetProcessor {

    constructor(container, url, loadingMessage, exceptionMessage) {
        this.container = container;
        this.url = url;
        this.loadingMessage = loadingMessage;
        this.exceptionMessage = exceptionMessage;
    }

    clearContainer() {

        let container = document.getElementById(this.container);

        while (container.hasChildNodes()) {
            container.removeChild(container.firstChild);
        }

    }

    displayLoading() {

        this.clearContainer();

        let alert = `<div class='alert alert-primary'>${this.loadingMessage}</div>`;

        document.getElementById(this.container).innerHTML = alert;

    }

    displayException() {

        this.clearContainer();

        let alert = `<div class='alert alert-danger'>${this.exceptionMessage}</div>`;

        document.getElementById(this.container).innerHTML = alert;
    }

    displayDataset(dataset) {

        this.clearContainer();

        let cards = document.createElement("div");
        cards.classList.add("card-columns");

        for (let item of dataset) {

            let card = this.displayDatasetItem(item);
            cards.appendChild(card);
        }

        document.getElementById(this.container).appendChild(cards);

    }

    displayDatasetItem(item) {
        let empty = document.createTextNode("");
        return empty;
    }

    loadDatasetFromJson(json) {
        return json;
    }

    loadDataset() {

        this.displayLoading();

        fetch(this.url)
            .then((response) => {
                return response.json();
            })
                .then((json) => {
                    let dataset = this.loadDatasetFromJson(json);
                    this.displayDataset(dataset);
                })
            .catch(() => {
                this.displayException();
            });

    }
}

export default DatasetProcessor;