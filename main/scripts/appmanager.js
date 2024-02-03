
function moveElement(element, initialClass) {
    let rect = element[0].getBoundingClientRect();
    element
        .css({ top: rect.top, left: rect.left })
        .removeClass(initialClass)
        .draggable();
}

function freezeElement(element) {
    element.draggable("destroy");
}


class AppManager {
    constructor() {
        this.initializeState();
        this.createDomElements();
        this.setupEventHandlers();
    }

    initializeState() {
        this.text      = null;
        this.url       = null;
        this.css       = null;
        this.asset     = null
        this.color     = null;
        this.clipboard = null;

        this.textOn      = false;
        this.urlOn       = false;
        this.assetOn     = false;
        this.cssOn       = false;
        this.colorOn     = false;
        this.clipboardOn = false;
        this.clipboard   = new Clipboard();
    }

    createDomElements() {
        this.appMenu = $('<div>')
            .attr('id', 'Menu')
            .addClass('appMenu menuInitial')
            

        this.moveButton = $('<div>')
            .addClass('vertical-line')
            .appendTo(this.appMenu)
            .on('mousedown', () => moveElement(this.appMenu, "menuInitial"))
            .on('mouseup', () => freezeElement(this.appMenu));
    }

    setupEventHandlers() {

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.turnAppsOffExcept();
                this.turnClipboardOff();
            }
        });

        this.textButton      = this.createAppMenuButton("textButton", "menuButton", this.textButton, "text-icon.svg", "Copy Text");
        this.urlButton       = this.createAppMenuButton("urlButton", "menuButton", this.urlButton, "link-icon.svg", "Copy URL");
        this.cssButton       = this.createAppMenuButton("cssButton", "menuButton", this.cssButton, "code-icon.svg", "Copy Code");
        this.assetButton     = this.createAppMenuButton("assetButton", "menuButton", this.assetButton, "asset-icon.svg", "Copy Image");
        this.colorButton     = this.createAppMenuButton("colorButton", "menuButton", this.colorButton, "color-icon.svg", "Copy Color");
        this.clipboardButton = this.createAppMenuButton("clipboardButton", "menuButton", this.clipboardButton, "clipboard-icon.svg", "Clipboard");
        this.closeButton     = this.createAppMenuButton("closeButton", "menuButton", this.close, "close-icon.svg", "Close App");


    }

    createAppMenuButton(id, cls, handler, img, tooltip) {
        const button = $('<button>')
            .attr('id', id)
            .addClass(cls);

        const image = $('<img>')
            .addClass('menuImage')
            .attr('src', `chrome-extension://laonhdndhpeoachehnobbcjdcnnhlioe/assets/${img}`);

        const tooltipSpan = $('<span>')
            .addClass('tooltip')
            .text(tooltip);

        button.append(image, tooltipSpan);

        if (handler) {
            button.on('click', handler.bind(this));
        }

        this.appMenu.append(button);
        return button;
    }


    inject() {
        $('body').append(this.appMenu);
    }



    textButton() {
        this.textOn = !this.textOn;

        if (this.textOn) {
            this.turnAppsOffExcept("text");
            this.text = new Text();
        }
        else {
            this.text.close();
            this.turnAppsOffExcept();
        }
    }



    urlButton() {
        this.urlOn = !this.urlOn;

        if (this.urlOn) {
            this.turnAppsOffExcept("url");
            this.url = new Url();
        } else {
            this.url.close();
            this.turnAppsOffExcept();
        }
    }



    cssButton() {
        this.cssOn = !this.cssOn;


        if (this.cssOn) {
            this.turnAppsOffExcept("css");
            this.css = new CssWin();

            let document        = GetCurrentDocument();
            let inspectorWindow = document.getElementById('InspectorWindow_container');

              // If InspectorWindow not injected, inject!
            if (!inspectorWindow) {
                let inspectorWindow = this.css.buildInspectorWindow();
                document.body.appendChild(inspectorWindow);
                this.css.addEventListeners();
            }
              // Assigning reference but not executing keypress function
            document.onkeydown = Viewer_Keypress;


        } else {
            this.turnAppsOffExcept();
        }


          // Check if VeiwerWindow injected

    }


    assetButton() {
        this.assetOn = !this.assetOn;



        if (this.assetOn) {
            this.turnAppsOffExcept("asset");

        }
        else {
            this.turnAppsOffExcept();
        }

    }


    colorButton() {
        this.colorOn = !this.colorOn;

        if (this.colorOn) {
            this.turnAppsOffExcept("color");
            this.color = new Color();
        }
        else {
            this.turnAppsOffExcept();
        }
    }

    clipboardButton() {
        this.clipboardOn = !this.clipboardOn;
        console.log(this.clipboardOn);
        if (this.clipboardOn) {

            this.clipboardButton.addClass('active');
            this.clipboard.clipboard.removeClass('hidden');
        }
        else {
            this.turnClipboardOff();
            this.clipboardButton.removeClass('active');
            this.clipboard.clipboard.addClass('hidden');

        }
    }

    turnClipboardOff() {
        this.clipboardButton.removeClass('active');
    }

    turnAppsOffExcept(str = undefined) {
        const apps = ['text', 'url', 'css', 'asset', 'color'];

          // Reset all states, properties and buttons
        apps.forEach(app => {
            if (this[app] != null) {
                this[app].close();
            }
            this[app + 'On'] = false;
            this[app]        = null;
            this[app + 'Button'].removeClass('active');
        });

          // Set the active state, property and button
        if (apps.includes(str)) {
            this[str + 'On'] = true;
            this[str + 'Button'].addClass('active');
        }
    }

    close() {
        this.clipboard.clipboard.remove();

        this.appMenu.remove();
        
    }
}