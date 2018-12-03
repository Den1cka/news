import "./index.scss";
import icon from "./home.png";
import config from "./shared/config.js";

import AlertService from "./shared/alert.service.js";
import ApiFactory from "./shared/api.factory.js";

import SourceModel from "./features/source/source.model.js";
import SourceView from "./features/source/source.view.js";
import SourceController from "./features/source/source.controller.js";

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
