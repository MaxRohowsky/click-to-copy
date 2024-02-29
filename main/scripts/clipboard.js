const IGNORE_CLASSES = ['clipboardFilter__filter', 'clipboardItems__item', 'clipboardItems__item__type', 'clipboardItems__item__content', 'clipboardItems__item__remove', 'appMenu__button__img', 'appMenu__button__tooltip', 'appMenu__button', 'appMenuActiveBtn', 'appMenu__move', 'appMenu__divider'];
const IGNORE_IDS = ['clipboard', 'clipboardTop', 'clipboardFilter', 'clipboardItems', 'clipboardEnd', 'clipboardEnd__copy', 'clipboardEnd__clear', 'clipboard__trashIcon', 'clipboardEnd__signature', 'clipboard__closeIcon', 'clipboard__moveIcon', 'appMenu'];


class CopiedObj {
    constructor(type, content) {
        this.toDisplay = false;
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
        this.clipboardCount = 0;
        this.buildClipboard();
        this.setEventHandlers();
    }

    buildClipboard() {
        this.clipboard = $('<div>').attr('id', 'clipboard').addClass(['clipboardHidden', 'clipboardInitialPosition']);

        this.clipboardTop = $('<div>').attr('id', 'clipboardTop');
        this.clipboardFilter = $('<div>').attr('id', 'clipboardFilter')

        this.allFilter = $('<button>').addClass(['clipboardFilter__filter']).text('All').addClass('appMenuActiveBtn');
        this.textFilter = $('<button>').addClass(['clipboardFilter__filter']).text('Text');
        this.urlFilter = $('<button>').addClass(['clipboardFilter__filter']).text('URLs');
        this.codeFilter = $('<button>').addClass(['clipboardFilter__filter']).text('CSS');

        this.clipboardItems = $('<div>').attr('id', 'clipboardItems');
        this.clipboardEnd = $('<div>').attr('id', 'clipboardEnd');
        this.clipboardCopyButton = $('<button>').attr('id', 'clipboardEnd__copy').text(`Copy (${this.clipboardCount} Items)`);
        this.clipboardClearButton = $('<div>').attr('id', 'clipboardEnd__clear');
        this.clipboardSignature = $('<a>').attr('id', 'clipboardEnd__signature').attr('href', 'https://github.com/maxontech/click-to-copy').text('☆ on GitHub');

        this.trashIcon = $('<img>').attr('id', 'clipboard__trashIcon').attr('src', `${EXTENSION_ID}/assets/trash-icon.svg`);
        this.closeIcon = $('<img>').attr('id', 'clipboard__closeIcon').attr('src', `${EXTENSION_ID}/assets/close-classic-icon.svg`);
        this.moveIcon = $('<img>').attr('id', 'clipboard__moveIcon').attr('src', `${EXTENSION_ID}/assets/move-icon-clipboard.svg`);

        this.clipboard.append(this.clipboardTop, this.clipboardFilter, this.clipboardItems, this.clipboardEnd, this.clipboardSignature);
        this.clipboardTop.append(this.moveIcon, this.closeIcon);
        this.clipboardFilter.append(this.allFilter, this.textFilter, this.urlFilter, this.codeFilter);
        this.clipboardEnd.append(this.clipboardCopyButton, this.clipboardClearButton);
        this.clipboardClearButton.append(this.trashIcon);

        $('body').append(this.clipboard);
    }


    setEventHandlers() {
        this.trashIcon.on("click", () => {
            this.clipboardItems.empty();
            this.clear();
            this.showCount();
        });
        this.closeIcon.on('click', () => {
            this.clipboard.addClass('clipboardHidden')
            /* Remove blue highlight from clipboard button */
            appManager.clipboard.button.removeClass('appMenuActiveBtn');
            appManager.clipboardOn = false;
        });
        this.clipboardTop.on('mousedown', () => moveElement(this.clipboard, "clipboardInitialPosition"))
            .on('mouseup', () => freezeElement(this.clipboard));

        this.clipboardCopyButton.on('click', this.writeToClipboard.bind(this))

        this.allFilter.on('click', () => this.filter('all'));
        this.textFilter.on('click', () => this.filter('text'));
        this.urlFilter.on('click', () => this.filter('url'));
        this.codeFilter.on('click', () => this.filter('code'));
    }


    filter(type) {
        this.setFilter = type;

        this.allFilter.removeClass('appMenuActiveBtn');
        this.textFilter.removeClass('appMenuActiveBtn');
        this.urlFilter.removeClass('appMenuActiveBtn');
        this.codeFilter.removeClass('appMenuActiveBtn');

        this[`${type}Filter`].addClass('appMenuActiveBtn');

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

        // Show the count
        this.showCount();

        // Add all objs that have toDisplay set to true
        this.addToDisplayObjs();
    }

    showCount = () => {
        this.clipboardCount = this.copiedObjs.filter(obj => obj.toDisplay === true).length;
        this.clipboardCopyButton.text(`Copy (${this.clipboardCount} Items)`);
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
            .attr('class', 'clipboardItems__item');
        const itemType = $('<img>')
            .attr('class', 'clipboardItems__item__type')
            .attr('src', `${EXTENSION_ID}/assets/${obj.type}-icon.svg`);
        const itemContentDiv = $('<div>')
            .attr('class', 'clipboardItems__item__content')
            .text(obj.type === 'code' ? obj.snippet : obj.content);
        const itemRemove = $('<img>')
            .attr('class', 'clipboardItems__item__remove')
            .attr('src', `${EXTENSION_ID}/assets/close-classic-icon.svg`)
            .on('click', (event) => {
                $(event.target).parent().remove();
                console.log(this.copiedObjs);
                this.copiedObjs.splice(this.copiedObjs.indexOf(obj), 1);
                this.showCount();
            });

        clipboardItem.append(itemType, itemContentDiv, itemRemove);
        this.clipboardItems.append(clipboardItem);

        if (obj.content.length > 32) {
            itemContentDiv.addClass('overflowing');
        }
    }

    writeToClipboard() {
        const filterAndJoin = array => array.filter(item => item !== null).join('\n');

        const copiedText = this.copiedObjs.filter(obj => obj.type === 'text').map(obj => obj.content);
        const copiedUrls = this.copiedObjs.filter(obj => obj.type === 'url').map(obj => obj.content);
        const copiedCode = this.copiedObjs.filter(obj => obj.type === 'code').map(obj => obj.content);


        if (this.setFilter === 'all') {
            navigator.clipboard.writeText([
                filterAndJoin(copiedText),
                filterAndJoin(copiedUrls),
                filterAndJoin(copiedCode)
            ].join('\n'));
        } else if (this.setFilter === 'text') {
            navigator.clipboard.writeText(filterAndJoin(copiedText));
        } else if (this.setFilter === 'url') {
            navigator.clipboard.writeText(filterAndJoin(copiedUrls));
        } else if (this.setFilter === 'code') {
            navigator.clipboard.writeText(filterAndJoin(copiedCode));
        }



    }


    clear() {
        this.copiedObjs = []; 
        this.showCount();
    }

    close(){
        console.log('closing clipboard');
    }



}