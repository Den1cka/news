import "./exception.scss";

class ExceptionService {
    static instance;

    constructor() {
        if (ExceptionService.instance) {
            return ExceptionService.instance;
        }

        this.container = "exception-container";
        ExceptionService.instance = this;
    }

    clearContainer() {
        const container = document.getElementById(this.container);

        while (container.hasChildNodes()) {
            container.removeChild(container.firstChild);
        }
    }

    displayPopup(message) {
        const string = `
        <div class="modal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Oops! Something went wrong...</h5>
                        <span id="close" class="close">&times;</span>
                    </div>
                    <div class="modal-body">
                        ${message}
                    </div>
                </div>
            </div>
        </div>`;

        const wrapper = document.createElement("div");
        wrapper.innerHTML = string;
        const popup = wrapper.firstElementChild;

        const close = popup.querySelector("#close");
        close.onclick = () => this.clearContainer();

        window.onclick = (event) => {
            if (event.target === popup) {
                this.clearContainer();
            }
        };

        document.getElementById(this.container).appendChild(popup);
    }
}

export default ExceptionService;
