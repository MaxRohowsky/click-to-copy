
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
        this.text = null;
        this.url = null;
        this.code = null;
        //this.asset = null
        this.color = null;
        this.clipboard = null;

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

        this.textButton      = this.createAppMenuButton("textButton", "menuButton", "text-icon.svg", "Copy Text");
        this.urlButton       = this.createAppMenuButton("urlButton", "menuButton", "link-icon.svg", "Copy URLs");
        this.codeButton      = this.createAppMenuButton("codeButton", "menuButton", "code-icon.svg", "Copy Code");
        //this.assetButton     = this.createAppMenuButton("assetButton", "menuButton", "asset-icon.svg", "Copy Image");
        this.colorButton     = this.createAppMenuButton("colorButton", "menuButton", "color-icon.svg", "Copy Colors");
        this.clipboardButton = this.createAppMenuButton("clipboardButton", "menuButton", "clipboard-icon.svg", "Clipboard");
        this.closeButton     = this.createAppMenuButton("closeButton", "menuButton", "close-icon.svg", "Close App");
    }

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
        //this.assetButton.on('click', () => this.handleButtonClick("asset", Asset));
        this.colorButton.on('click', () => this.handleButtonClick("color", Color));
        this.clipboardButton.on('click', this.handleClipboardButtonClick.bind(this));
        this.closeButton.on('click', this.close.bind(this));
    }

    createAppMenuButton(id, cls, img, tooltip) {

        const image = $('<img>')
            .addClass('menuImage')
            .attr('src', chrome.runtime.getURL(`assets/${img}`)); 

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

    close() {
        this.clipboard.clipboard.remove();
        this.appMenu.remove();
    }
}