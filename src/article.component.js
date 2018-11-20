import DataService from "./data.service.js";
import AlertService from "./alert.service.js";

class ArticleComponent {
    constructor(datacontainer, alertcontainer, apikey, sourceId) {
        this.datacontainer = datacontainer;
        this.alertService = new AlertService(alertcontainer);
        this.dataService = new DataService(apikey);
        this.sourceId = sourceId;
        this.loadingMessage = "Loading of the articles...";
        this.exceptionMessage = "Unfortunately, we have gotten an exception during retrieving list of articles :(";
        this.completionMessage = "Loading of the articles has been completed!";
    }

    clearContainer() {
        const container = document.getElementById(this.datacontainer);

        while (container.hasChildNodes()) {
            container.removeChild(container.firstChild);
        }
    }

    async loadArticlesAsync() {
        this.clearContainer();
        this.alertService.clearContainer();
        this.alertService.displayLoading(this.loadingMessage);

        const cards = document.createElement("div");
        cards.classList.add("card-columns");
        document.getElementById(this.datacontainer).appendChild(cards);

        try {
            for await (const article of this.dataService.getArticlesAsync(this.sourceId)) {
                const card = this.renderArticle(article);
                cards.appendChild(card);
            }
        } catch (error) {
            this.alertService.displayException(this.exceptionMessage);
        }

        this.alertService.displayCompletion(this.completionMessage);
    }

    // This should be method of the class
    // eslint-disable-next-line class-methods-use-this
    renderArticle(article) {
        const string = `
        <div class="card">
            ${article.urlToImage ? `<img class="card-img-top" src="${article.urlToImage}">` : ""}
            <div class="card-body">
                <h5 class="card-title">${article.title}</h5>
                <p class="card-text">${article.description}</p>
            </div>
            <div class="card-footer text-muted text-center">Published - ${new Date(article.publishedAt).toLocaleString()}</div>
        </div>`;

        const wrapper = document.createElement("div");
        wrapper.innerHTML = string;
        const card = wrapper.firstElementChild;

        return card;
    }
}

export default ArticleComponent;
