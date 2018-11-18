import DatasetProcessor from './dasetprocessor.js';
import config from './config.js';

const { apikey } = config;

class ArticleProcessor extends DatasetProcessor {
    constructor(container, sourceId) {
        const url = `https://newsapi.org/v2/everything?sources=${sourceId}&apiKey=${apikey}&pageSize=10`;
        const loadingMessage = `Loading of the articles...`;
        const exceptionMessage = `Unfortunately, we have gotten an exception during retrieving list of articles :(`;

        super(container, url, loadingMessage, exceptionMessage);
    }

    loadDatasetFromJson({ articles }) {
        return articles;
    }

    displayDatasetItem(item) {
        const string = `
            <div class="card">
                ${item.urlToImage ? `<img class="card-img-top" src="${item.urlToImage}">` : ``}
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.description}</p>
                </div>
                <div class="card-footer text-muted text-center">Published - ${new Date(item.publishedAt).toLocaleString()}</div>
            </div>`;

        const wrapper = document.createElement(`div`);
        wrapper.innerHTML = string;
        const card = wrapper.firstElementChild;

        return card;
    }
}

export default ArticleProcessor;
