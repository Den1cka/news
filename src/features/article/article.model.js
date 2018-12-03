import EventHandler from "~/shared/eventhandler.js";

class ArticleModel {
    constructor(api, sourceId) {
        this.onGetDefaultAsyncBefore = new EventHandler(this);
        this.onGetDefaultAsync = new EventHandler(this);
        this.onGetDefaultAsyncException = new EventHandler(this);
        this.onGetDefaultAsyncAfter = new EventHandler(this);

        this.api = api;
        this.sourceId = sourceId;

        this.articles = [];
    }

    async getDefaultAsync() {
        this.onGetDefaultAsyncBefore.notify();
        this.articles = [];

        try {
            for await (const article of this.getArticleGeneratorAsync(this.sourceId)) {
                this.articles.push(article);
                this.onGetDefaultAsync.notify(article);
            }
        } catch (error) {
            this.onGetDefaultAsyncException.notify();
        }

        this.onGetDefaultAsyncAfter.notify();
    }

    async* getArticleGeneratorAsync(sourceId) {
        for (let i = 1; i <= 10; i += 1) {
            const parameters = { sources: sourceId, pageSize: 1, page: i };
            // eslint-disable-next-line no-await-in-loop
            const [article] = await this.api.getAsync(parameters);
            yield article;
        }
    }
}

export default ArticleModel;
