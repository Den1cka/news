import SourceComponent from "./source.component.js";
import ArticleComponent from "./article.component.js";
import config from "./config.js";

const { apikey } = config;

function loadArticle(sourceId) {
    const article = new ArticleComponent("data-container", "alert-container", apikey, sourceId);
    article.loadArticlesAsync();
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
