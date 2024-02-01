class AppManager {
    constructor() {
        this.initializeState();
        this.createDomElements();
        this.setupEventHandlers();
    }

    initializeState() {
        this.text      = null;
        this.url       = null;
        this.css    = null;
        this.asset     = null
        this.color   = null;
        this.clipboard = null;

        this.textOn      = false;
        this.urlOn       = false;
        this.assetOn     = false;
        this.cssOn      = false;
        this.dropperOn   = false;
        this.clipboardOn = false;
        this.clipboard   = new Clipboard();
    }

    createDomElements() {
        this.appMenu = $('<div>')
            .attr('id', 'Menu')
            .addClass('appMenu menuInitial')
            .draggable();

        this.moveButton = $('<div>')
            .addClass('vertical-line')
            .appendTo(this.appMenu)
            .on('mousedown', this.DragMenu.bind(this))
            .on('mouseup', this.FreezeMenu.bind(this));
    }

    setupEventHandlers() {
        this.textButton      = this.CreateAppMenuButton("textButton", "menuButton", this.TextButton, "text-icon.svg", "Copy Text");
        this.urlButton       = this.CreateAppMenuButton("urlButton", "menuButton", this.UrlButton, "link-icon.svg", "Copy URL");
        this.cssButton      = this.CreateAppMenuButton("cssButton", "menuButton", this.CssButton, "code-icon.svg", "Copy Code");
        this.assetButton     = this.CreateAppMenuButton("assetButton", "menuButton", this.AssetButton, "asset-icon.svg", "Copy Image");
        this.colorButton     = this.CreateAppMenuButton("colorButton", "menuButton", this.ColorButton, "color-icon.svg", "Copy Color");
        this.clipboardButton = this.CreateAppMenuButton("clipboardButton", "menuButton", this.ClipboardButton, "clipboard-icon.svg", "Copied Items");
        this.closeButton     = this.CreateAppMenuButton("closeButton", "menuButton", this.Close, "close-icon.svg", "Close App");
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


    Inject() {
        $('body').append(this.appMenu);
    }


    ToggleButton(toggle, element) {
        element.toggleClass('active', toggle);
    }



    TextButton() {
        this.textOn = !this.textOn;

        if(this.textOn) {
            this.TurnAppsOffExcept("text");
            this.text = new Text();
        }
        else {
            this.text.Close();
            this.TurnAppsOffExcept();
        }
    }



    UrlButton() {
        this.urlOn = !this.urlOn;
        
        if (this.urlOn) {
            this.TurnAppsOffExcept("url");
            this.url = new Url();
        } else {
            this.url.Close();
            this.TurnAppsOffExcept();
        }
    }



    CssButton() {
        this.cssOn = !this.cssOn;
        

        if (this.cssOn) {
            this.TurnAppsOffExcept("css");
            this.css = new Viewer();

            let document        = GetCurrentDocument();
            let inspectorWindow = document.getElementById('InspectorWindow_container');
    
                // If InspectorWindow not injected, inject!
            if (!inspectorWindow) {
                let inspectorWindow = this.css.BuildInspectorWindow();
                document.body.appendChild(inspectorWindow);
                this.css.AddEventListeners();
            }
                // Assigning reference but not executing keypress function
            document.onkeydown = Viewer_Keypress;


        } else {   
            this.TurnAppsOffExcept();
        }


            // Check if VeiwerWindow injected
       
    }


    AssetButton() {
        this.assetOn = !this.assetOn;
        


        if (this.assetOn) {
            this.TurnAppsOffExcept("asset");

        } 
        else {
            this.TurnAppsOffExcept();
        }
    
    }


    ColorButton() {
        this.colorOn = !this.colorOn;


        if (this.colorOn) {
            this.TurnAppsOffExcept("color");
            this.color = new Dropper();
        }
        else {
            this.TurnAppsOffExcept();
        }
    }

    ClipboardButton() {
        this.ToggleButton(this.clipboardOn, this.clipboardButton);
    }

    TurnAppsOffExcept(str = undefined) {
        const apps = ['text', 'url', 'css', 'asset', 'color'];
    
          // Reset all states, properties and buttons
        apps.forEach(app => {
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

    Close() {
        this.codeOn = false;

        if (this.css) {
            this.css.RemoveEventListeners();
            this.css = null;
        }

        if (this.bin) {
            this.bin.RemoveEventListeners();
            this.bin = null;
        }

        let inspectorWindow = document.getElementById('InspectorWindow_container');
        if (inspectorWindow) {
            inspectorWindow.remove();
        }

        this.appMenu.remove();
    }
}