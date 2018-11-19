class DataService {
    constructor(apikey) {
        this.apikey = apikey;
    }

    getSources() {
        const url = `https://newsapi.org/v2/sources?apiKey=${this.apikey}`;

        return fetch(url)
            .then(response => response.json())
            .then(({ sources }) => sources);
    }

    async* getArticlesAsync(sourceId) {
        for (let i = 1; i <= 10; i += 1) {
            const url = `https://newsapi.org/v2/everything?sources=${sourceId}&apiKey=${this.apikey}&pageSize=1&page=${i}`;
            // eslint-disable-next-line no-await-in-loop
            const response = await fetch(url);
            // eslint-disable-next-line no-await-in-loop
            const json = await response.json();
            const [article] = json.articles;
            yield article;
        }
    }
}

export default DataService;
