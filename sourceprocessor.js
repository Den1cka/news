import DatasetProcessor from './dasetprocessor.js';
import config from './config.js';

class SourceProcessor extends DatasetProcessor {

    constructor(container) {
        
        let url = `https://newsapi.org/v2/sources?apiKey=${config.apikey}`;
        const loadingMessage = "Loading of the sources...";
        const exceptionMessage = "Unfortunately, we have gotten an exception during retrieving list of sources :(";
        
        super(container, url, loadingMessage, exceptionMessage);
        
        this.onClick = (item) => {return;};
    }

    displayDatasetItem(item) {

        let string = `<div class="card"><div class="card-body"><h5 class="card-title">${item.name}</h5><p class="card-text">${item.description}</p><a id="${item.id}" class="btn btn-primary" href="#">See more..</a></div></div>`;
        
        let wrapper = document.createElement('div');
        wrapper.innerHTML= string;
        let card = wrapper.firstChild;

        card.querySelector(`#${item.id}`).onclick = () => this.onClick(item);
        
        return card;
    }

    loadDatasetFromJson(json) {
        return json.sources;
    }
}

export default SourceProcessor;