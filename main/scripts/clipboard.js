

const IGNORE_CLASSES = ["appMenu", "menuButton", "menuImage", "clipboard", "clipboard_item", "clipboard_item_type", "clipboard_item_content", "clipboard_item_remove", "vertical-line"];

function createElement(type, id, classes = [], text = '') {
    return $(`<${type}>`).attr('id', id).addClass(classes).text(text);
}


class CopiedObj {
    //static lastIndex = -1;

    constructor(type, content) {
        //this.index = ++CopiedObj.lastIndex;
        this.isDisplayed = true;
        this.inClipboard = false;
        this.type = type;
        this.content = content;
    }
    
    /*static resetIndex() {
        CopiedObj.lastIndex = -1;
    }*/

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
            if (obj.type === type) {
                obj.isDisplayed = true;
            } else {
                obj.isDisplayed = false;
            }
        });
        this.refreshClipboard();
    }

    nofilter() {
        this.copiedObjs.forEach(obj => {
            obj.isDisplayed = true;
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


        const allFilter = createElement('button', 'clipboard_filter_all_button', ['clipboard'], 'all');
        allFilter.on('click', () => {
            this.nofilter();
        });

        const textFilter = createElement('button', 'clipboard_filter_text_button', ['clipboard'], 'text');
        textFilter.on('click', () => {
            this.filter('text');
        });

        const urlsFilter = createElement('button', 'clipboard_filter_urls_button', ['clipboard'], 'urls');
        urlsFilter.on('click', () => {
            this.filter('url');
        });

        const cssFilter = createElement('button', 'clipboard_filter_css_button', ['clipboard'], 'css');
        cssFilter.on('click', () => {
            this.filter('code');
        });

        const colorsFilter = createElement('button', 'clipboard_filter_colors_button', ['clipboard'], 'colors');
        colorsFilter.on('click', () => {
            this.filter('color');
        });

        this.clipboardFilter.append(allFilter, textFilter, urlsFilter, cssFilter, colorsFilter);

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

    refreshClipboard() {
        this.updateClipboardIcon();
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

    updateClipboardIcon() {
        let i = (this.copiedObjs.length) % 4; // This will cycle through 0, 1, 2, 3 as this.count increases
        appManager.clipboardIcon = `clipboard-icon-${i}.svg`;
        appManager.clipboardButton.find('img').attr('src', `${EXTENSION_ID}/assets/${appManager.clipboardIcon}`);
    }


    
    

    clear() {
        this.copiedObjs = []; 
        CopiedObj.resetIndex();

    }




}