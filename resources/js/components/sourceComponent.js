import DataService from '../services/dataService.js';
import InterfaceService from '../services/interfaceService.js';

class SourceComponent {
    constructor(container, apikey) {
        this.container = container;
        this.interfaceService = new InterfaceService(container);
        this.dataService = new DataService(apikey);
        this.loadingMessage = `Loading of the sources...`;
        this.exceptionMessage = `Unfortunately, we have gotten an exception during retrieving list of sources :(`;
    }

    loadSources() {
        this.interfaceService.displayLoading(this.loadingMessage);

        this.dataService.getSources()
            .then((sources) => {
                this.displaySources(sources);
            })
            .catch(() => {
                this.interfaceService.displayException(this.exceptionMessage);
            });
    }

    displaySources(sources) {
        this.interfaceService.clearContainer();

        const cards = document.createElement(`div`);
        cards.classList.add(`card-columns`);

        for (const source of sources) {
            const card = this.renderSource(source);
            cards.appendChild(card);
        }

        document.getElementById(this.container).appendChild(cards);
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

        const wrapper = document.createElement(`div`);
        wrapper.innerHTML = string;
        const card = wrapper.firstElementChild;

        if (this.onClick) {
            card.querySelector(`#${source.id}`).onclick = () => this.onClick(source);
        }

        return card;
    }
}

export default SourceComponent;
