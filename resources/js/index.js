import SourceProcessor from './sourceprocessor.js';
import ArticleProcessor from './articleprocessor.js';

function loadArticle(sourceId) {
    const article = new ArticleProcessor(`data-container`, sourceId);
    article.loadDataset();
}

function loadSource() {
    const source = new SourceProcessor(`data-container`);
    source.onClick = (item) => {
        loadArticle(item.id);
    };
    source.loadDataset();
}

const body = document.getElementById(`body`);
body.onload = () => { loadSource(); };

const home = document.getElementById(`home`);
home.onclick = () => { loadSource(); };
