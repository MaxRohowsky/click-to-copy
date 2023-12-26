let viewer;
let bin;

class AppManager {
    constructor() {
        this.codeOn = false;
        this.assetOn = false;
        this.editOn = false;
        this.binOn = false;

        this.appMenu = $('<div id="Menu" class="appMenu"></div>');
        this.codeButton = this.CreateAppMenuButton("codeButton", "menuButton", this.CodeButton, "code-icon.svg");
        this.assetButton = this.CreateAppMenuButton("assetButton", "menuButton", null, "asset-icon.svg");
        this.editButton = this.CreateAppMenuButton("editButton", "menuButton", null, "edit-icon.svg");
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
            //document.body.style.setProperty('cursor', 'default', 'important');
            bin = new Bin();
            bin.AddEventListeners();
        } else {
            buttonElement.classList.remove('active');
            //document.body.style.removeProperty('cursor');
            bin.RemoveEventListeners();
            bin = null;
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