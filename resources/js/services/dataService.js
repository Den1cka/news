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

    getArticles(sourceId) {
        const url = `https://newsapi.org/v2/everything?sources=${sourceId}&apiKey=${this.apikey}&pageSize=10`;

        return fetch(url)
            .then(response => response.json())
            .then(({ articles }) => articles);
    }
}

export default DataService;
