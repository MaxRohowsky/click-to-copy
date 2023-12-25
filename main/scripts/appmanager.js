let viewer;
let bin;

class AppManager {
    constructor() {
        this.codeOn = false;
        this.assetOn = false;
        this.editOn = false;
        this.binOn = false;

        this.appMenu = $('<div id="Menu"></div>');
        this.codeButton = this.CreateAppMenuButton("codeButton", "menuButton", this.CodeButton, "code-icon.svg");
        this.assetButton = this.CreateAppMenuButton("assetButton", "menuButton", null, "asset-icon.svg");
        this.editButton = this.CreateAppMenuButton("editButton", "menuButton", null, "edit-icon.svg");
        this.binButton = this.CreateAppMenuButton("binButton", "menuButton", this.BinButton, "trash-icon.svg");
        this.closeButton = this.CreateAppMenuButton("closeButton", "menuButton", this.Close, "close-icon.svg");
    }

    CreateAppMenuButton = function (id, cls, handler, img) {
        const button = $(`<button  ${id ? ` id="${id}"` : ''} ${cls ? ` class="${cls}"` : ''}><img src="chrome-extension://laonhdndhpeoachehnobbcjdcnnhlioe/assets/${img}"></button>`);

        if (handler) {
            button.on('click', handler.bind(this));
        }

        this.appMenu.append(button);
        return button;
    }


    Inject = function () {
        $('body').append(this.appMenu);
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
        //this.Toggle(this.binOn,'binButton')

        this.binOn = !this.binOn;

        let buttonElement = document.getElementById('binButton');

        if (this.binOn) {
            binButtonElm.classList.add('active');

            bin = new Bin();
            bin.AddEventListeners();
            console.log('Bin Added');
        } else {
            buttonElement.classList.remove('active');


        }

    }






    EditButton = function () {
        this.editOn = !this.editOn;

        let editButtonElm = document.getElementById('editButton');

        if (this.editOn) {
            editButtonElm.classList.add('active');
        } else {
            editButtonElm.classList.remove('active');
        }

    }


    Close = function () {
        this.codeOn = false;
        this.binOn = false;

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