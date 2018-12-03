import config from "~/shared/config.js";
import AlertService from "~/shared/alert.service.js";
import ApiFactory from "~/shared/api.factory.js";

const { apikey } = config;

class SourceController {
    constructor(sourceModel, sourceView) {
        this.sourceModel = sourceModel;
        this.sourceView = sourceView;

        this.sourceView.onClick.attach((sender, args) => {
            const alertService = new AlertService("alert-container");
            const api = ApiFactory.create(apikey, "articles");

            import(/* webpackChunkName: "article.model" */ "~/features/article/article.model.js").then(({ default: ArticleModel }) => {
                const model = new ArticleModel(api, args.id);

                import(/* webpackChunkName: "article.view" */ "~/features/article/article.view.js").then(({ default: ArticleView }) => {
                    const view = new ArticleView(model, "data-container", alertService);

                    import(/* webpackChunkName: "article.controller" */ "~/features/article/article.controller.js").then(({ default: ArticleController }) => {
                        const controller = new ArticleController(model, view);
                        controller.init();
                    });
                });
            });
        });
    }

    init() {
        this.sourceModel.getDefault();
    }
}

export default SourceController;
