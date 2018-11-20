import DataService from "./data.service.js";
import AlertService from "./alert.service.js";

class SourceComponent {
    constructor(datacontainer, alertcontainer, apikey) {
        this.datacontainer = datacontainer;
        this.alertService = new AlertService(alertcontainer);
        this.dataService = new DataService(apikey);
        this.loadingMessage = "Loading of the sources...";
        this.exceptionMessage = "Unfortunately, we have gotten an exception during retrieving list of sources :(";
        this.completionMessage = "Loading of the sourses has been completed!";
    }

    clearContainer() {
        const container = document.getElementById(this.datacontainer);

        while (container.hasChildNodes()) {
            container.removeChild(container.firstChild);
        }
    }

    loadSources() {
        this.clearContainer();
        this.alertService.clearContainer();
        this.alertService.displayLoading(this.loadingMessage);

        this.dataService.getSources()
            .then((sources) => {
                this.displaySources(sources);
            })
            .catch(() => {
                this.alertService.displayException(this.exceptionMessage);
            })
            .finally(() => {
                this.alertService.displayCompletion(this.completionMessage);
            });
    }

    displaySources(sources) {
        const cards = document.createElement("div");
        cards.classList.add("card-columns");

        for (const source of sources) {
            const card = this.renderSource(source);
            cards.appendChild(card);
        }

        document.getElementById(this.datacontainer).appendChild(cards);
    }

    renderSource(source) {
        const string = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${source.name}</h5>
                    <p class="card-text">${source.description}</p>
                    <a id="${source.id}" class="btn btn-primary" href="#">See more..</a>
                </div>
            </div>`;

        const wrapper = document.createElement("div");
        wrapper.innerHTML = string;
        const card = wrapper.firstElementChild;

        if (this.onClick) {
            card.querySelector(`#${source.id}`).onclick = () => this.onClick(source);
        }

        return card;
    }
}

export default SourceComponent;
