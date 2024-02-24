


/*
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

class App{
    constructor() {
        this.app = null;
        this.isOn = false;
        this.icon = null;
    }

    launch() {
        this.isOn = true;
        this.app.removeClass('hidden');
        this.icon.addClass('active');
    }

    close() {
        this.isOn = false;
        this.app.addClass('hidden');
        this.icon.removeClass('active');
    }

}


class AppManager {
    constructor() {
        this.initializeState();
        this.createDomElements();
        this.setupEventHandlers();
    }

    initializeState() {
        this.text = null;
        this.url = null;
        this.code = null;
        //this.asset = null
        this.color = null;
        this.clipboard = null;
        this.clipboardIcon =  "clipboard-icon-0.svg"

        this.textOn = false;
        this.urlOn = false;
        //this.assetOn = false;
        this.codeOn = false;
        this.colorOn = false;
        this.clipboardOn = false;
        this.clipboard = new Clipboard();
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
            
        //this.gridButton      = this.createAppMenuButton("gridButton", "menuButton", "grid-icon.svg", "Grid");
        this.textButton      = this.createAppMenuButton("textButton", "menuButton", "text-icon.svg", "Copy Text");
        this.urlButton       = this.createAppMenuButton("urlButton", "menuButton", "url-icon.svg", "Copy URLs");
        this.codeButton      = this.createAppMenuButton("codeButton", "menuButton", "code-icon.svg", "Copy Code");
        //this.assetButton     = this.createAppMenuButton("assetButton", "menuButton", "asset-icon.svg", "Copy Image");
        this.colorButton     = this.createAppMenuButton("colorButton", "menuButton", "color-icon.svg", "Copy Colors");
        this.clipboardButton = this.createAppMenuButton("clipboardButton", "menuButton", this.clipboardIcon, "Clipboard");
        this.closeButton     = this.createAppMenuButton("closeButton", "menuButton", "close-icon.svg", "Close App");
    }



    setupEventHandlers() {

        $(document).on('keydown', (event) => {
            if (event.key === 'Escape') {
                this.turnAppsOffExcept();
                this.turnClipboardOff();
            }
        });

        //this.gridButton.on('click', () => this.handleButtonClick("grid", Grid));
        this.textButton.on('click', () => this.handleButtonClick("text", Text));
        this.urlButton.on('click', () => this.handleButtonClick("url", Url));
        this.codeButton.on('click', () => this.handleButtonClick("code", Code));
        //this.assetButton.on('click', () => this.handleButtonClick("asset", Asset));
        this.colorButton.on('click', () => this.handleButtonClick("color", Color));
        this.clipboardButton.on('click', this.handleClipboardButtonClick.bind(this));
        this.closeButton.on('click', this.close.bind(this));
    }

    createAppMenuButton(id, cls, img, tooltip) {

        const image = $('<img>')
            .addClass('menuImage')
            .attr('src', `${EXTENSION_ID}/assets/${img}`)
            //.attr('src', chrome.runtime.getURL(`assets/${img}`)); 

        const tooltipSpan = $('<span>')
            .addClass('tooltip')
            .text(tooltip);

        const button = $('<button>')
            .attr('id', id)
            .addClass(cls)
            .append(image, tooltipSpan);

        this.appMenu.append(button);

        return button;
    }

    inject() {
        $('body').append(this.appMenu);
    }

    handleButtonClick(type, instance) {
        this[`${type}On`] = !this[`${type}On`];
        if (this[`${type}On`]) {
            this.turnAppsOffExcept(`${type}`);
            this[type] = new instance();
        } else {
            this[type].close();
            this.turnAppsOffExcept();
        }
    }

    turnAppsOffExcept(str = undefined) {
        const apps = ['text', 'url', 'code', 'color'];


        apps.forEach(app => {
            if (this[app] != null) {
                this[app].close();
            }
            this[app + 'On'] = false;
            this[app] = null;
            this[app + 'Button'].removeClass('active');
        });


        if (apps.includes(str)) {
            this[str + 'On'] = true;
            this[str + 'Button'].addClass('active');
        }
    }

    handleClipboardButtonClick() {
        this.clipboardOn = !this.clipboardOn;

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

    close() {
        this.clipboard.clipboard.remove();
        this.appMenu.remove();
    }
}


//let appm = new AppManager();
//appm.inject()

*/

const EXTENSION_ID = 'chrome-extension://laonhdndhpeoachehnobbcjdcnnhlioe';

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

class App {
    static allApps = [];

    static tooltip = {
        text: "Copy Text",
        url: "Copy URLs",
        code: "Copy Code",
        color: "Copy Colors"
    }

    constructor(id, appClass) {
        this.id = id;
        this.appClass = appClass;
        this.app = appClass.name.toLowerCase();
        this.isOn = false;
        this.button = this.button();
        this.instance = null;

        if (this.constructor === App) App.allApps.push(this);
    }

    button() {
        const image = $('<img>')
            .addClass('menuImage')
            .attr('src', `${EXTENSION_ID}/assets/${this.app}-icon.svg`)

        const tooltipSpan = $('<span>')
            .addClass('tooltip')
            .text(App.tooltip[this.app]);

        const button = $('<button>')
            .attr('id', this.id)
            .addClass('menuButton')
            .append(image, tooltipSpan)
            .on('click', () => this.handleClick());

        return button;
    }

    handleClick() {
        this.isOn = !this.isOn;
        //console.log(App.allApps);
        if (this.isOn) {
            this.closeExceptThis();
            this.launch();
        } else {
            this.closeThis();
        }
    }


    launch() {
        console.log('launching', this.app);
        this.isOn = true;
        this.instance = new this.appClass();
        this.button.addClass('active');
    }


    closeThis() {
        console.log('closing', this.app);
        this.instance.close();
        this.instance = null;
        this.button.removeClass('active');
        this.isOn = false;
    }

    closeExceptThis() {
        App.allApps.forEach(app => {
            if (app !== this && app.isOn) {
                console.log('closing', app.app);
                app.isOn = false;
                app.button.removeClass('active');
                app.instance.close();
                app.instance = null;
            }
        });

    }

}


class ClipboardApp {
    constructor(id, appClass) {
        this.id = id;
        this.appClass = appClass;
        
        this.imgIndex = 0;
        this.app = appClass.name.toLowerCase();
        this.tooltip = "Clipboard";
        this.isOn = false;
        this.button = this.button();
        this.instance = new Clipboard();
    }

    button() {
        this.image = $('<img>')
            .addClass('menuImage')
            .attr('src', `${EXTENSION_ID}/assets/clipboard-icon-${this.imgIndex}.svg`)

        const tooltipSpan = $('<span>')
            .addClass('tooltip')
            .text(this.tooltip);

        const button = $('<button>')
            .attr('id', this.id)
            .addClass('menuButton')
            .append(this.image, tooltipSpan)
            .on('click', () => this.handleClick());

        return button;
    }

    handleClick() {
        this.isOn = !this.isOn;

        if (this.isOn) {
            this.button.addClass('active');
            this.instance.clipboard.removeClass('hidden');
        }
        else {
            this.button.removeClass('active');
            this.instance.clipboard.addClass('hidden');
        }

    }

    incrementImg() {
        this.imgIndex = this.instance.copiedObjs.length % 4;
        this.image.attr('src', `${EXTENSION_ID}/assets/clipboard-icon-${this.imgIndex}.svg`);
    }
}


class AppManager {
    constructor() {
        this.appMenu = $('<div>')
            .attr('id', 'Menu')
            .addClass('appMenu menuInitial')

        this.moveButton = $('<div>')
            .addClass('vertical-line')
            .appendTo(this.appMenu)
            .on('mousedown', () => moveElement(this.appMenu, "menuInitial"))
            .on('mouseup', () => freezeElement(this.appMenu));

        this.text = new App("textButton", Text);
        this.url = new App("urlButton", Url);
        this.code = new App("codeButton", Code);
        this.clipboard = new ClipboardApp("clipboardButton", Clipboard);


        const image = $('<img>')
            .addClass('menuImage')
            .attr('src', `${EXTENSION_ID}/assets/close-icon.svg`)

        const tooltipSpan = $('<span>')
            .addClass('tooltip')
            .text("Close App");

        this.closeButton = $('<button>')
            .attr('id', 'closeButton')
            .addClass('menuButton')
            .append(image, tooltipSpan)
            .on('click', () => this.handleClick());

        this.appMenu.append(this.text.button);
        this.appMenu.append(this.url.button);
        this.appMenu.append(this.code.button);
        this.appMenu.append(this.clipboard.button);
        this.appMenu.append(this.closeButton);
    }

    close() {
        this.clipboard.instance.clipboard.remove();
        this.appMenu.remove();
    }



    /*
    setupEventHandlers() {
        $(document).on('keydown', (event) => {
            if (event.key === 'Escape') {
                this.turnAppsOffExcept();
                this.turnClipboardOff();
            }
        });

        this.textButton.on('click', () => this.handleButtonClick("text", Text));
        this.urlButton.on('click', () => this.handleButtonClick("url", Url));
        this.codeButton.on('click', () => this.handleButtonClick("code", Code));
        this.colorButton.on('click', () => this.handleButtonClick("color", Color));
        this.clipboardButton.on('click', this.handleClipboardButtonClick.bind(this));
        this.closeButton.on('click', this.close.bind(this));
    }*/

    /*createAppMenuButton(id, cls, img, tooltip) {
        const image = $('<img>')
            .addClass('menuImage')
            .attr('src', `${EXTENSION_ID}/assets/${img}`)

        const tooltipSpan = $('<span>')
            .addClass('tooltip')
            .text(tooltip);

        const button = $('<button>')
            .attr('id', id)
            .addClass(cls)
            .append(image, tooltipSpan);

        this.appMenu.append(button);

        return button;
    }*/

    inject() {
        $('body').append(this.appMenu);
    }
    /*
    handleButtonClick(type, instance) {
        this[type].isOn = !this[type].isOn;
        if (this[type].isOn) {
            this.turnAppsOffExcept(`${type}`);
            this[type].app = new instance();
            this[type].launch();
        } else {
            this[type].close();
            this.turnAppsOffExcept();
        }
    }

    turnAppsOffExcept(str = undefined) {
        const apps = ['text', 'url', 'code', 'color'];

        apps.forEach(app => {
            if (this[app].app != null) {
                this[app].close();
            }
            this[app].isOn = false;
            this[app].app = null;
            this[app + 'Button'].removeClass('active');
        });

        if (apps.includes(str)) {
            this[str].isOn = true;
            this[str + 'Button'].addClass('active');
        }
    }

    handleClipboardButtonClick() {
        this.clipboard.isOn = !this.clipboard.isOn;

        if (this.clipboard.isOn) {
            this.clipboardButton.addClass('active');
            this.clipboard.app.removeClass('hidden');
        }
        else {
            this.turnClipboardOff();
            this.clipboardButton.removeClass('active');
            this.clipboard.app.addClass('hidden');
        }
    }

    turnClipboardOff() {
        this.clipboardButton.removeClass('active');
    }

    close() {
        this.clipboard.app.remove();
        this.appMenu.remove();
    }*/
}