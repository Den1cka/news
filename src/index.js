import "./index.scss";
import icon from "./home.png";

import SourceComponent from "./source.component.js";
import config from "./config.js";

const { apikey } = config;

function loadArticle(sourceId) {
    import(/* webpackChunkName: "article.component" */ "./article.component.js").then(({ default: ArticleComponent }) => {
        const article = new ArticleComponent("data-container", "alert-container", apikey, sourceId);
        article.loadArticlesAsync();
    });
}

function loadSource() {
    const source = new SourceComponent("data-container", "alert-container", apikey);
    source.onClick = (item) => {
        loadArticle(item.id);
    };
    source.loadSources();
}

const body = document.getElementById("body");
body.onload = () => { loadSource(); };

const home = document.getElementById("home");
home.onclick = () => { loadSource(); };

const homeImg = document.getElementById("home-img");
homeImg.src = icon;
