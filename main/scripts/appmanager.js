

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
        code: "Copy CSS",
        color: "Copy Colors"
    }

    constructor(id, appClass) {
        this.id = id;
        this.appClass = appClass;
        this.app = appClass.name.toLowerCase();
        this.isOn = false;
        this.button = this.button();
        this.instance = null;

        App.allApps.push(this);
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
            .on('click', () => this.close());

        this.appMenu.append(this.text.button);
        this.appMenu.append(this.url.button);
        this.appMenu.append(this.code.button);
        this.appMenu.append(this.clipboard.button);
        this.appMenu.append(this.closeButton);

        $(document).on('keydown', (e) => {
            if (e.key === 'Escape') {
                for (let app of App.allApps) {
                    if (app.isOn) {
                        app.closeThis();
                    }
                }
            }
        });
    }

    close() {
        this.clipboard.instance.clipboard.remove();
        this.appMenu.remove();
    }


    inject() {
        $('body').append(this.appMenu);
    }

}