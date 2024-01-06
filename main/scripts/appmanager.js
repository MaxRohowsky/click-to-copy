let text;
let url;
let viewer;
let dropper;
let bin;


class AppManager {
    constructor() {
        this.codeOn = false;
        this.textOn = false;
        this.urlOn = false;
        this.assetOn = false;
        this.dropperOn = false;
        this.binOn = false;

        this.appMenu = $('<div id="Menu" class="appMenu"></div>');
        this.moveButton = this.appMenu.append($(`<div class="vertical-line"></div>`))
        this.textButton = this.CreateAppMenuButton("textButton", "menuButton", this.TextButton, "text-icon.svg");
        this.urlButton = this.CreateAppMenuButton("urlButton", "menuButton", this.UrlButton, "link-icon.svg");
        this.codeButton = this.CreateAppMenuButton("codeButton", "menuButton", this.CodeButton, "code-icon.svg");
        this.assetButton = this.CreateAppMenuButton("assetButton", "menuButton", null, "asset-icon.svg");
        this.colorButton = this.CreateAppMenuButton("colorButton", "menuButton", this.DropperButton, "dropper-icon.svg");

        this.historyButton = this.CreateAppMenuButton("historyButton", "menuButton", null, "clipboard-icon.svg");
        this.binButton = this.CreateAppMenuButton("binButton", "menuButton", this.BinButton, "trash-icon.svg");
        this.closeButton = this.CreateAppMenuButton("closeButton", "menuButton", this.Close, "close-icon.svg");
    }



    CreateAppMenuButton = function (id, cls, handler, img) {
        const button = $(`<button  ${id ? ` id="${id}"` : ''} ${cls ? ` class="${cls}"` : ''}><img class="menuImage" src="chrome-extension://laonhdndhpeoachehnobbcjdcnnhlioe/assets/${img}"></button>`);

        if (handler) {
            button.on('click', handler.bind(this));
        }

        this.appMenu.append(button);
        return button;
    }

    Inject = function () {
        $('body').append(this.appMenu);
    }

    Toggle = function (toggle, element) {
        if (toggle) {
            element.addClass('active')
        } else {
            element.removeClass('active');
        }
    }

    TextButton = function () {
        this.textOn = !this.textOn;
        this.Toggle(this.textOn, this.textButton);



        if (this.textOn) {
            text = new Text();
            text.AddEventListeners();
        } else {
            console.log(this.textOn)
            text.RemoveEventListeners();
            text = null;

        }

    }

    UrlButton = function () {
        this.urlOn = !this.urlOn;
        this.Toggle(this.urlOn, this.urlButton);

        if (this.urlOn) {
            url = new Url();
            url.PreventDefault()
        } else {
            url.RestoreDefault();
            url = null;


        }

    }

    DropperButton = function () {
        this.colorOn = !this.colorOn;
        this.Toggle(this.colorOn, this.colorButton);

        if (this.colorOn) {
            /*if (('EyeDropper' in window)) {
                alert('Your browser supports the EyeDropper API');
            }*/

            dropper = new Dropper();




        } else {
            //dropper.RemoveEventListeners();
            //dropper = null;
        }
    }





    CodeButton = function () {
        viewer = new Viewer();

        // Check if VeiwerWindow injected
        let document = GetCurrentDocument();
        let inspectorWindow = document.getElementById('InspectorWindow_container');

        // If InspectorWindow not injected, inject!

        if (!inspectorWindow) {
            let inspectorWindow = viewer.BuildInspectorWindow();
            document.body.appendChild(inspectorWindow);
            viewer.AddEventListeners();
        }
        // Assigning reference but not executing keypress function
        document.onkeydown = Viewer_Keypress;
    }


    BinButton = function () {


        this.binOn = !this.binOn;
        let buttonElement = document.getElementById('binButton');

        if (this.binOn) {
            buttonElement.classList.add('active');
            bin = new Bin();
            bin.AddEventListeners();
        } else {
            buttonElement.classList.remove('active');
            bin.RemoveEventListeners();
            bin = null;
        }
    }





    Close = function () {
        this.codeOn = false;
        this.binOn = false;

        console.log(this.binOn);

        if (viewer) {
            viewer.RemoveEventListeners();
            viewer = null;
        }

        if (bin) {
            bin.RemoveEventListeners();
            bin = null;
        }

        let inspectorWindow = document.getElementById('InspectorWindow_container');
        if (inspectorWindow) {
            inspectorWindow.remove();
        }

        this.appMenu.remove();
    }






}