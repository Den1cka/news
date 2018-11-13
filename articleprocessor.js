import DatasetProcessor from './dasetprocessor.js';
import config from './config.js';

class ArticleProcessor extends DatasetProcessor {

    constructor(container, sourceId) {
        
        let url = `https://newsapi.org/v2/everything?sources=${sourceId}&apiKey=${config.apikey}&pageSize=10`;
        const loadingMessage = "Loading of the articles...";
        const exceptionMessage = "Unfortunately, we have gotten an exception during retrieving list of articles :(";

        super(container, url, loadingMessage, exceptionMessage);

    }

    loadDatasetFromJson(json) {
        return json.articles;
    }

    displayDatasetItem(item) {

        let string = `<div class="card">${item.urlToImage ? `<img class="card-img-top" src="${item.urlToImage}">` : ''}<div class="card-body"><h5 class="card-title">${item.title}</h5><p class="card-text">${item.description}</p></div><div class="card-footer text-muted text-center">Published - ${new Date(item.publishedAt).toLocaleString()}</div></div>`;
        
        let wrapper = document.createElement('div');
        wrapper.innerHTML= string;
        let card = wrapper.firstChild;

        return card;

    }
}

export default ArticleProcessor;