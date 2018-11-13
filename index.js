import SourceProcessor from './sourceprocessor.js';
import ArticleProcessor from './articleprocessor.js';

function loadSource() {    
    let source = new SourceProcessor("data-container");
    source.onClick = (item) => {
        loadArticle(item.id);
    };
    source.loadDataset();
}

function loadArticle(sourceId) {    
    let article = new ArticleProcessor("data-container", sourceId);
    article.loadDataset();
}

let body = document.getElementById("body");
body.onload = () => { loadSource(); };

let home = document.getElementById("home");
home.onclick = () => { loadSource(); };