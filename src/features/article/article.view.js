class ArticleView {
    constructor(articleModel, datacontainer, alertService) {
        this.articleModel = articleModel;
        this.datacontainer = datacontainer;

        this.alertService = alertService;

        this.loadingMessage = "Loading of the articles...";
        this.exceptionMessage = "Unfortunately, we have gotten an exception during retrieving list of articles :(";
        this.completionMessage = "Loading of the articles has been completed!";

        this.articleModel.onGetDefaultAsyncBefore.attach(() => {
            this.clearContainer();
            this.alertService.clearContainer();
            this.alertService.displayLoading(this.loadingMessage);

            this.cards = document.createElement("div");
            this.cards.classList.add("card-columns");
            document.getElementById(this.datacontainer).appendChild(this.cards);
        });

        this.articleModel.onGetDefaultAsync.attach((sender, args) => {
            const card = this.renderArticle(args);
            this.cards.appendChild(card);
        });

        this.articleModel.onGetDefaultAsyncException.attach(() => {
            this.alertService.displayException(this.exceptionMessage);

            import(/* webpackChunkName: "exception.service" */ "~/shared/exception/exception.service.js")
                .then(({ default: ExceptionService }) => {
                    const service = new ExceptionService();
                    service.displayPopup(this.exceptionMessage);
                });
        });

        this.articleModel.onGetDefaultAsyncAfter.attach(() => {
            this.alertService.displayCompletion(this.completionMessage);
        });
    }

    clearContainer() {
        const container = document.getElementById(this.datacontainer);

        while (container.hasChildNodes()) {
            container.removeChild(container.firstChild);
        }
    }

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

export default ArticleView;
