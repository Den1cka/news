import ApiFactory from "./api.factory.js";

class DataService {
    constructor(apikey) {
        this.apikey = apikey;
    }

    getSources() {
        const api = ApiFactory.create(this.apikey, "sources");
        return api.get();
    }

    async* getArticleGeneratorAsync(sourceId) {
        const api = ApiFactory.create(this.apikey, "articles");

        for (let i = 1; i <= 10; i += 1) {
            const parameters = { sources: sourceId, pageSize: 1, page: i };
            // eslint-disable-next-line no-await-in-loop
            const [article] = await api.getAsync(parameters);
            yield article;
        }
    }
}

export default DataService;
