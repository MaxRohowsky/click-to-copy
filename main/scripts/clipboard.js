const IGNORE_CLASSES = ["appMenu", "menuButton", "menuImage", "clipboard", "clipboard_item", "clipboard_item_type", "clipboard_item_content", "clipboard_item_remove", "vertical-line"];

function div(id, classes = []) {
    return $(`<div>`).attr('id', id).addClass(classes);
}

function button(id, classes = [], text = '') {
    return $(`<button>`).attr('id', id).addClass(classes).text(text);
}

function img(id, classes = [], src = '') {
    return $(`<img>`).attr('id', id).addClass(classes).attr('src', src);
}


class CopiedObj {
    constructor(type, content) {
        this.toDisplay = false;
        //this.inClipboard = false;
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
        this.setFilter = 'all';
        this.buildClipboard();
        this.setEventHandlers();
    }

    buildClipboard() {
        this.clipboard = div('clipboard', ['clipboard', 'hidden', 'clipboardInitial']);
        this.clipboardContainer = div('clipboard_container', ['clipboard']);
        this.clipboardTop = div('clipboard_top', ['clipboard']);
        this.clipboardMid = div('clipboard_mid', ['clipboard']);
        this.clipboardFilter = div('clipboard_filter', ['clipboard']);

        this.allFilter = button('clipboard_filter_all_button', ['clipboard'], 'all');
        this.allFilter.addClass('active');
        this.textFilter = button('clipboard_filter_text_button', ['clipboard'], 'text');
        this.urlFilter = button('clipboard_filter_urls_button', ['clipboard'], 'urls');
        this.codeFilter = button('clipboard_filter_css_button', ['clipboard'], 'css');
        
        this.clipboardItems = div('clipboard_items', ['clipboard']);
        this.clipboardEnd = div('clipboard_end', ['clipboard']);
        this.clipboardCopyButton = div('clipboard_copy_button', ['clipboard']).text('Copy');
        this.clipboardClearButton = div('clipboard_clear_button', ['clipboard']);
        this.trashIcon = img('clipboard_trash_icon', ['clipboard'], `${EXTENSION_ID}/assets/trash-icon.svg`);
        this.closeIcon = img('clipboard_close_icon', ['clipboard'], `${EXTENSION_ID}/assets/close-classic-icon.svg`);

        this.clipboard.append(this.clipboardContainer);
        this.clipboardContainer.append(this.clipboardTop, this.clipboardMid, this.clipboardEnd);
        this.clipboardTop.append(this.closeIcon);
        this.clipboardMid.append(this.clipboardFilter, this.clipboardItems);
        this.clipboardFilter.append(this.allFilter, this.textFilter, this.urlFilter, this.codeFilter);
        this.clipboardEnd.append(this.clipboardCopyButton, this.clipboardClearButton);
        this.clipboardClearButton.append(this.trashIcon);

        $('body').append(this.clipboard);
    }


    setEventHandlers() {
        this.trashIcon.on("click", () => {
            this.clipboardItems.empty();
            this.clear();
        });
        this.closeIcon.on('click', () => {
            this.clipboard.addClass('hidden')
            /* Remove blue highlight from clipboard button */
            appManager.clipboard.button.removeClass('active');
            appManager.clipboardOn = false;
        });
        this.clipboardTop.on('mousedown', () => moveElement(this.clipboard, "clipboardInitial"))
            .on('mouseup', () => freezeElement(this.clipboard));

        this.clipboardCopyButton.on('click', this.writeToClipboard.bind(this))

        this.allFilter.on('click', () => this.filter('all'));
        this.textFilter.on('click', () => this.filter('text'));
        this.urlFilter.on('click', () => this.filter('url'));
        this.codeFilter.on('click', () => this.filter('code'));


    }


    filter(type) {
        this.setFilter = type;

        this.allFilter.removeClass('active');
        this.textFilter.removeClass('active');
        this.urlFilter.removeClass('active');
        this.codeFilter.removeClass('active');

        this[`${type}Filter`].addClass('active');

        this.refreshClipboard();
    }



    refreshClipboard() {
        // Adjust the Image
        appManager.clipboard.incrementImg();

        // Clear the clipboard
        this.clipboardItems.empty();

        // Set toDisplay flag for each copiedObj
        this.copiedObjs.forEach(obj => {
            if(this.setFilter === 'all' || this.setFilter === obj.type){
                obj.toDisplay = true;
            }
            else{
                obj.toDisplay = false;
            }
        });

        // Add all objs that have toDisplay set to true
        this.addToDisplayObjs();
    }


    // If toDisplay, add to clipboard
    addToDisplayObjs() {
        this.copiedObjs.forEach(obj => {
            if (obj.toDisplay) {
                this.addObj(obj);
            }
        });
    }


    addObj(obj) {
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