let viewer;
let bin;
let edit;

class AppManager {
    constructor() {
        this.codeOn = false;
        this.assetOn = false;
        this.editOn = false;
        this.binOn = false;

        this.appMenu = $('<div id="Menu" class="appMenu"></div>');
        this.codeButton = this.CreateAppMenuButton("codeButton", "menuButton", this.CodeButton, "code-icon.svg");
        this.assetButton = this.CreateAppMenuButton("assetButton", "menuButton", null, "asset-icon.svg");
        this.editButton = this.CreateAppMenuButton("editButton", "menuButton", this.EditButton, "edit-icon.svg");
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
        //close edit if open
        if (this.editOn) {
            this.EditButton();
        }
        
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


    EditButton = function () {
        //close bin if open
        if (this.binOn) {
            this.BinButton();
        }
        
        this.editOn = !this.editOn;
        let buttonElement = document.getElementById('editButton');

        if (this.editOn) {
            buttonElement.classList.add('active');
            edit = new Edit();
            edit.AddEventListeners();
        } else {
            buttonElement.classList.remove('active');
            //edit.RemoveEventListeners();
            edit = null;
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