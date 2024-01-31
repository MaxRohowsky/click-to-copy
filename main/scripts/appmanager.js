let text;
let url;
let viewer;
let dropper;
let bin;
//let clipboard;


class AppManager {
    constructor() {
        this.codeOn = false;
        this.textOn = false;
        this.urlOn = false;
        this.assetOn = false;
        this.dropperOn = false;

        this.clipboardOn = false;
        //clipboard = new Clipboard();
        this.clipboard = new Clipboard();


        this.appMenu = $('<div id="Menu" class="appMenu menuInitial"></div>');
        this.appMenu.draggable();

        this.moveButton = this.appMenu.append($(`<div class="vertical-line" ></div>`))
        this.moveButton.on('mousedown', this.DragMenu.bind(this));
        this.moveButton.on('mouseup', this.FreezeMenu.bind(this));

        this.textButton = this.CreateAppMenuButton("textButton", "menuButton", this.TextButton, "text-icon.svg", "Copy Text");
        this.urlButton = this.CreateAppMenuButton("urlButton", "menuButton", this.UrlButton, "link-icon.svg", "Copy URL");
        this.codeButton = this.CreateAppMenuButton("codeButton", "menuButton", this.CodeButton, "code-icon.svg", "Copy Code");
        this.assetButton = this.CreateAppMenuButton("assetButton", "menuButton", null, "asset-icon.svg", "Copy Image");
        this.colorButton = this.CreateAppMenuButton("colorButton", "menuButton", this.DropperButton, "dropper-icon.svg", "Copy Color");

        this.clipboardButton = this.CreateAppMenuButton("clipboardButton", "menuButton", this.ClipboardButton, "clipboard-icon.svg", "Copied Items");
        this.closeButton = this.CreateAppMenuButton("closeButton", "menuButton", this.Close, "close-icon.svg", "Close App");
    }


    DragMenu() {
        let rect = this.appMenu[0].getBoundingClientRect();
        this.appMenu.removeClass("menuInitial");
        this.appMenu.css({ top: rect.top, left: rect.left });
    }

    FreezeMenu() {
        let rect = this.appMenu[0].getBoundingClientRect();
        this.appMenu.css({ top: rect.top, left: rect.left });
    }



    CreateAppMenuButton(id, cls, handler, img, tooltip) {
        const button = $(`<button  ${id ? ` id="${id}"` : ''} ${cls ? ` class="${cls}"` : ''} ><img class="menuImage" src="chrome-extension://laonhdndhpeoachehnobbcjdcnnhlioe/assets/${img}"><span class="tooltip">${tooltip}</span></button>`);

        if (handler) {
            button.on('click', handler.bind(this));
        }

        this.appMenu.append(button);
        return button;
    }

    Inject() {
        $('body').append(this.appMenu);
    }

    Toggle(toggle, element) {
        if (toggle) {
            element.addClass('active')
        } else {
            element.removeClass('active');
        }
    }

    TextButton() {
        this.TurnOffAllButtons();
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

    ClipboardButton() {
        this.TurnOffAllButtons();
        this.clipboardOn = !this.clipboardOn;

        this.Toggle(this.clipboardOn, this.clipboardButton);

    }

    TurnOffAllButtons() {
        this.textOn = false;
        this.urlOn = false;
        this.assetOn = false;
        this.dropperOn = false;

        this.textButton.removeClass('active');
        this.urlButton.removeClass('active');
        this.assetButton.removeClass('active');
        this.colorButton.removeClass('active');
        this.clipboardButton.removeClass('active');
        //this.binButton.removeClass('active');
    }


    UrlButton() {
        this.TurnOffAllButtons();
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

    DropperButton() {
        this.TurnOffAllButtons();
        this.colorOn = !this.colorOn;
        this.Toggle(this.colorOn, this.colorButton);

        if (this.colorOn) {
            dropper = new Dropper();
        }
    }





    CodeButton() {
        this.TurnOffAllButtons();
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




    Close() {
        this.TurnOffAllButtons();
        this.codeOn = false;


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