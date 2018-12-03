import EventHandler from "~/shared/eventhandler.js";

class SourceView {
    constructor(sourceModel, datacontainer, alertService) {
        this.onClick = new EventHandler(this);

        this.sourceModel = sourceModel;
        this.datacontainer = datacontainer;

        this.alertService = alertService;

        this.loadingMessage = "Loading of the sources...";
        this.exceptionMessage = "Unfortunately, we have gotten an exception during retrieving list of sources :(";
        this.completionMessage = "Loading of the sourses has been completed!";

        this.sourceModel.onGetDefaultBefore.attach(() => {
            this.clearContainer();
            this.alertService.clearContainer();
            this.alertService.displayLoading(this.loadingMessage);
        });

        this.sourceModel.onGetDefault.attach((sender, args) => {
            this.displaySources(args);
        });

        this.sourceModel.onGetDefaultException.attach(() => {
            this.alertService.displayException(this.exceptionMessage);

            import(/* webpackChunkName: "exception.service" */ "~/shared/exception/exception.service.js")
                .then(({ default: ExceptionService }) => {
                    const service = new ExceptionService();
                    service.displayPopup(this.exceptionMessage);
                });
        });

        this.sourceModel.onGetDefaultAfter.attach(() => {
            this.alertService.displayCompletion(this.completionMessage);
        });
    }

    clearContainer() {
        const container = document.getElementById(this.datacontainer);

        while (container.hasChildNodes()) {
            container.removeChild(container.firstChild);
        }
    }

    displaySources(sources) {
        const cards = document.createElement("div");
        cards.classList.add("card-columns");

        for (const source of sources) {
            const card = this.renderSource(source);
            cards.appendChild(card);
        }

        document.getElementById(this.datacontainer).appendChild(cards);
    }

    renderSource(source) {
        const string = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${source.name}</h5>
                    <p class="card-text">${source.description}</p>
                    <a id="${source.id}" class="btn btn-primary" href="#">See more..</a>
                </div>
            </div>`;

        const wrapper = document.createElement("div");
        wrapper.innerHTML = string;
        const card = wrapper.firstElementChild;

        card.querySelector(`#${source.id}`).onclick = () => this.onClick.notify(source);

        return card;
    }
}

export default SourceView;
