class ArticleController {
    constructor(articleModel, articleView) {
        this.articleModel = articleModel;
        this.articleView = articleView;
    }

    init() {
        this.articleModel.getDefaultAsync();
    }
}

export default ArticleController;
