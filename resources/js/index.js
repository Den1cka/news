import SourceComponent from './components/sourceComponent.js';
import ArticleComponent from './components/articleComponent.js';
import config from './config.js';

const { apikey } = config;

function loadArticle(sourceId) {
    const article = new ArticleComponent(`data-container`, apikey, sourceId);
    article.loadArticles();
}

function loadSource() {
    const source = new SourceComponent(`data-container`, apikey);
    source.onClick = (item) => {
        loadArticle(item.id);
    };
    source.loadSources();
}

const body = document.getElementById(`body`);
body.onload = () => { loadSource(); };

const home = document.getElementById(`home`);
home.onclick = () => { loadSource(); };
