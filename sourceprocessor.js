import DatasetProcessor from './dasetprocessor.js';
import config from './config.js';
const {apikey} = config;

class SourceProcessor extends DatasetProcessor {

    constructor(container) {
        
        const url = `https://newsapi.org/v2/sources?apiKey=${apikey}`;
        const loadingMessage = "Loading of the sources...";
        const exceptionMessage = "Unfortunately, we have gotten an exception during retrieving list of sources :(";
        
        super(container, url, loadingMessage, exceptionMessage);
        
        this.onClick = (item) => {return;};
    }

    displayDatasetItem(item) {

        const string = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">${item.description}</p>
                    <a id="${item.id}" class="btn btn-primary" href="#">See more..</a>
                </div>
            </div>`;
        
        const wrapper = document.createElement('div');
        wrapper.innerHTML = string;
        const card = wrapper.firstElementChild;

        card.querySelector(`#${item.id}`).onclick = () => this.onClick(item);
        
        return card;
    }

    loadDatasetFromJson({sources}) {
        return sources;
    }
}

export default SourceProcessor;