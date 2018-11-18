import DataService from '../services/dataService.js';
import InterfaceService from '../services/interfaceService.js';

class ArticleComponent {
    constructor(container, apikey, sourceId) {
        this.container = container;
        this.interfaceService = new InterfaceService(container);
        this.dataService = new DataService(apikey);
        this.sourceId = sourceId;
        this.loadingMessage = `Loading of the articles...`;
        this.exceptionMessage = `Unfortunately, we have gotten an exception during retrieving list of articles :(`;
    }

    loadArticles() {
        this.interfaceService.displayLoading(this.loadingMessage);

        this.dataService.getArticles(this.sourceId)
            .then((articles) => {
                this.displayArticles(articles);
            })
            .catch(() => {
                this.interfaceService.displayException(this.exceptionMessage);
            });
    }

    displayArticles(articles) {
        this.interfaceService.clearContainer();

        const cards = document.createElement(`div`);
        cards.classList.add(`card-columns`);

        for (const article of articles) {
            const card = this.renderArticle(article);
            cards.appendChild(card);
        }

        document.getElementById(this.container).appendChild(cards);
    }

    // This should be method of the class
    // eslint-disable-next-line class-methods-use-this
    renderArticle(article) {
        const string = `
        <div class="card">
            ${article.urlToImage ? `<img class="card-img-top" src="${article.urlToImage}">` : ``}
            <div class="card-body">
                <h5 class="card-title">${article.title}</h5>
                <p class="card-text">${article.description}</p>
            </div>
            <div class="card-footer text-muted text-center">Published - ${new Date(article.publishedAt).toLocaleString()}</div>
        </div>`;

        const wrapper = document.createElement(`div`);
        wrapper.innerHTML = string;
        const card = wrapper.firstElementChild;

        return card;
    }
}

export default ArticleComponent;
