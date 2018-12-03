const convert = function convert(object) {
    const string = [];
    for (const property in object) {
        if (Object.prototype.hasOwnProperty.call(object, property)) {
            string.push(`${encodeURIComponent(property)}=${encodeURIComponent(object[property])}`);
        }
    }
    return string.join("&");
};

class Api {
    constructor(apiKey, url, type) {
        this.apiKey = apiKey;
        this.url = url;
        this.type = type;
    }

    get(params) {
        const query = convert(params);
        const url = query ? `${this.url}?${query}` : this.url;

        const options = { headers: { "x-api-key": this.apiKey } };

        return fetch(url, options)
            .then(response => response.json())
            .then(json => json[this.type]);
    }

    async getAsync(parameters) {
        const query = convert(parameters);
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

class ApiProxy {
    // eslint-disable-next-line class-methods-use-this
    get(target, property, receiver) {
        const value = Reflect.get(target, property, receiver);
        if (typeof value === "function") {
            return function trace(...args) {
                // eslint-disable-next-line no-console
                console.log(`Api-Call. Type - '${this.type}', Method - '${property}', Parameters - '${JSON.stringify(args)}'.`);
                return value.apply(this, args);
            };
        }
        return value;
    }
}

class ApiFactory {
    static create(apiKey, type) {
        const host = "https://newsapi.org/v2";

        switch (type) {
        case "sources": {
            const url = `${host}/sources`;
            const api = new Api(apiKey, url, "sources");
            const proxy = new ApiProxy();
            return new Proxy(api, proxy);
        }
        case "articles": {
            const url = `${host}/everything`;
            const api = new Api(apiKey, url, "articles");
            const proxy = new ApiProxy();
            return new Proxy(api, proxy);
        }
        default:
            throw new Error(`Factory does not support type '${type}'.`);
        }
    }
}

export default ApiFactory;
