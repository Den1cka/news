class Api {
    convert = function convert(object) {
        const string = [];
        for (const property in object) {
            if (Object.prototype.hasOwnProperty.call(object, property)) {
                string.push(`${encodeURIComponent(property)}=${encodeURIComponent(object[property])}`);
            }
        }
        return string.join("&");
    }

    constructor(apiKey, url, type) {
        this.apiKey = apiKey;
        this.url = url;
        this.type = type;
    }

    get(params) {
        const query = this.convert(params);
        const url = query ? `${this.url}?${query}` : this.url;

        const options = { headers: { "x-api-key": this.apiKey } };

        return fetch(url, options)
            .then(response => response.json())
            .then(json => json[this.type]);
    }

    async getAsync(parameters) {
        const query = this.convert(parameters);
        const url = query ? `${this.url}?${query}` : this.url;

        const options = { headers: { "x-api-key": this.apiKey } };

        const response = await fetch(url, options);
        const json = await response.json();
        return json[this.type];
    }

    // eslint-disable-next-line class-methods-use-this
    post() {
        throw new Error("Method 'post' does not implemented.");
    }

    // eslint-disable-next-line class-methods-use-this
    put() {
        throw new Error("Method 'put' does not implemented.");
    }
}

class ApiFactory {
    static create(apiKey, type) {
        const host = "https://newsapi.org/v2";

        switch (type) {
        case "sources": {
            const url = `${host}/sources`;
            return new Api(apiKey, url, "sources");
        }
        case "articles": {
            const url = `${host}/everything`;
            return new Api(apiKey, url, "articles");
        }
        default:
            throw new Error(`Factory does not support type '${type}'.`);
        }
    }
}

export default ApiFactory;
