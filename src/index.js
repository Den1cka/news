import "./index.scss";
import icon from "./home.png";
import config from "./config.js";

import AlertService from "./alert.service.js";
import ApiFactory from "./api.factory.js";

import SourceModel from "./source.model.js";
import SourceView from "./source.view.js";
import SourceController from "./source.controller.js";

const { apikey } = config;

function loadSource() {
    const alertService = new AlertService("alert-container");
    const api = ApiFactory.create(apikey, "sources");
    const model = new SourceModel(api);
    const view = new SourceView(model, "data-container", alertService);

    const controller = new SourceController(model, view);
    controller.init();
}

const body = document.getElementById("body");
body.onload = () => { loadSource(); };

const home = document.getElementById("home");
home.onclick = () => { loadSource(); };

const homeImg = document.getElementById("home-img");
homeImg.src = icon;
