const IGNORE_CLASSES = ["appMenu", "menuButton", "menuImage", "clipboard", "clipboard_item", "clipboard_item_type", "clipboard_item_content", "clipboard_item_remove", "vertical-line"];

function createElement(type, id, classes = [], text = '') {
    return $(`<${type}>`).attr('id', id).addClass(classes).text(text);
}


class CopiedObj {
    constructor(type, content) {
        this.isDisplayed = false;
        this.inClipboard = false;
        this.type = type;
        this.content = content;
    }
}


class CopiedCSS extends CopiedObj {
    constructor(type, content, snippet) {
        super(type, content);
        this.snippet = snippet;
    }
}


class Clipboard {
    constructor() {
        this.copiedObjs = []; 
        this.buildClipboard();
    }

    filter(type) {
        this.copiedObjs.forEach(obj => {
            if (type === 'all' || obj.type === type) {
                obj.isDisplayed = true;
            } else {
                obj.isDisplayed = false;
            }
        });
        this.refreshClipboard();
    }

    buildClipboard() {
        this.clipboard = createElement('div', 'clipboard', ['clipboard', 'hidden', 'clipboardInitial']);
        this.clipboardContainer = createElement('div', 'clipboard_container', ['clipboard']);
        this.clipboardTop = createElement('div', 'clipboard_top', ['clipboard']);
        this.clipboardMid = createElement('div', 'clipboard_mid', ['clipboard']);
        this.clipboardFilter = createElement('div', 'clipboard_filter', ['clipboard']);
        this.clipboardItems = createElement('div', 'clipboard_items', ['clipboard']);
        this.clipboardEnd = createElement('div', 'clipboard_end', ['clipboard']);
        this.clipboardCopyButton = createElement('button', 'clipboard_copy_button', ['clipboard'], 'Copy');
        this.clipboardClearButton = createElement('button', 'clipboard_clear_button', ['clipboard']);


        const filters = {
            all: { button: createElement('button', 'clipboard_filter_all_button', ['clipboard'], 'all'), active: true },
            text: { button: createElement('button', 'clipboard_filter_text_button', ['clipboard'], 'text'), active: false },
            url: { button: createElement('button', 'clipboard_filter_urls_button', ['clipboard'], 'urls'), active: false },
            code: { button: createElement('button', 'clipboard_filter_css_button', ['clipboard'], 'css'), active: false }
        };

        filters.all.button.on('click', () => {
            Object.values(filters).forEach(filterObj => {
                filterObj.button.removeClass('active');
                filterObj.active = false;
            });
            filters.all.button.addClass('active');
            filters.all.active = true;
            this.filter('all');
        });
        
        filters.text.button.on('click', () => {
            Object.values(filters).forEach(filterObj => {
                filterObj.button.removeClass('active');
                filterObj.active = false;
            });
            filters.text.button.addClass('active');
            filters.text.active = true;
            this.filter('text');
        });
        
        filters.url.button.on('click', () => {
            Object.values(filters).forEach(filterObj => {
                filterObj.button.removeClass('active');
                filterObj.active = false;
            });
            filters.url.button.addClass('active');
            filters.url.active = true;
            this.filter('url');
        });
        
        filters.code.button.on('click', () => {
            Object.values(filters).forEach(filterObj => {
                filterObj.button.removeClass('active');
                filterObj.active = false;
            });
            filters.code.button.addClass('active');
            filters.code.active = true;
            this.filter('code');
        });
        
        filters.all.button.addClass('active');
        filters.all.active = true;


        this.clipboardFilter.append(filters.all.button, filters.text.button, filters.url.button, filters.code.button);


        const trashIcon = createElement('img')
            .addClass('clipboard', 'clipboard_trash_icon')
            .attr('src', `${EXTENSION_ID}/assets/trash-icon.svg`)
            .on("click", () => {
                this.clipboardItems.empty();
                this.clear();
            });

        const closeIcon = createElement('img')
            .addClass('clipboard', 'clipboard_close_icon')
            .attr('src', `${EXTENSION_ID}/assets/close-classic-icon.svg`)
            .on('click', () => {
                this.clipboard.addClass('hidden')
                appManager.clipboardButton.removeClass('active');
                appManager.clipboardOn = false;
            });

        this.clipboard.append(
            this.clipboardContainer.append(
                this.clipboardTop.append(closeIcon)
                    .on('mousedown', () => moveElement(this.clipboard, "clipboardInitial"))
                    .on('mouseup', () => freezeElement(this.clipboard)),
                this.clipboardMid.append(this.clipboardFilter, this.clipboardItems),
                this.clipboardEnd.append(this.clipboardCopyButton.on('click', this.writeToClipboard.bind(this)), this.clipboardClearButton.append(trashIcon))
            )
        );

        $('body').append(this.clipboard);
    }

    /* Adjust clipboard icon, remove all items, and show isDisplayed*/
    refreshClipboard() {
        appManager.clipboard.incrementImg();
        this.clipboardItems.empty();
        this.copiedObjs.forEach(obj => {
            if (obj.isDisplayed) {
                this.addItemToClipboard(obj);
            }
        });
    }

    addItemToClipboard(obj) {
        const clipboardItem = $('<div>')
            .attr('class', 'clipboard_item');
        const itemType = $('<img>')
            .attr('class', 'clipboard_item_type')
            .attr('src', `${EXTENSION_ID}/assets/${obj.type}-icon.svg`);
        const itemContentDiv = $('<div>')
            .attr('class', 'clipboard_item_content')
            .text(obj.type === 'code' ? obj.snippet : obj.content);
        const itemRemove = $('<img>')
            .attr('class', 'clipboard_item_remove')
            .attr('src', `${EXTENSION_ID}/assets/close-classic-icon.svg`)
            .on('click', (event) => {
                $(event.target).parent().remove();
                console.log(this.copiedObjs);
                this.copiedObjs.splice(this.copiedObjs.indexOf(obj), 1);
            });

        clipboardItem.append(itemType, itemContentDiv, itemRemove);
        this.clipboardItems.append(clipboardItem);

        if (obj.content.length > 32) {
            itemContentDiv.addClass('overflowing');
        }
    }

    writeToClipboard() {
        const filterAndJoin = array => array.filter(item => item !== null).join('\n');

        const combinedText = [
            filterAndJoin(this.copiedText),
            filterAndJoin(this.copiedUrls),
            filterAndJoin(this.copiedColors),
            filterAndJoin(this.copiedCode)
        ].join('\n');

        navigator.clipboard.writeText(combinedText)
            .then(() => {
                console.log('Text copied to clipboard');
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    }


    clear() {
        this.copiedObjs = []; 
        CopiedObj.resetIndex();

    }

    close(){
        console.log('closing clipboard');
    }



}