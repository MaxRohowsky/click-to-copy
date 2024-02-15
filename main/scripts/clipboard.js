const EXTENSION_ID = 'chrome-extension://laonhdndhpeoachehnobbcjdcnnhlioe';

const IGNORE_CLASSES = ["appMenu", "menuButton", "menuImage", "clipboard"]

function createElement(type, id, classes = [], text = '') {
    return $(`<${type}>`).attr('id', id).addClass(classes).text(text);
}

class Clipboard {
    constructor() {
        this.copiedText = [];
        this.copiedUrls = [];
        this.copiedColors = [];
        this.copiedCode = [];
        this.lastTextIndex = 0;
        this.lastUrlIndex = 0;
        this.lastColorIndex = 0;
        this.lastCodeIndex = 0;
        this.buildClipboard();
    }

    

    buildClipboard() {
        this.clipboard = createElement('div', 'clipboard', ['clipboard', 'hidden', 'clipboardInitial']);
        this.clipboardContainer = createElement('div', 'clipboard_container');
        this.clipboardTop = createElement('div', 'clipboard_top');
        this.clipboardMid = createElement('div', 'clipboard_mid');
        this.clipboardItemHeader = createElement('div', 'clipboard_item_header', [], 'Clipboard');
        this.clipboardItems = createElement('div', 'clipboard_items');
        this.clipboardEnd = createElement('div', 'clipboard_end');
        this.clipboardCopyButton = createElement('button', 'clipboard_copy_button', [], 'Copy');
        this.clipboardClearButton = createElement('button', 'clipboard_clear_button');

        const trashIcon = createElement('img')
            .addClass('clipboard_trash_icon')
            .attr('src', `${EXTENSION_ID}/assets/trash-icon.svg`)
            .on("click", () => {
                this.clipboardItems.empty();
                this.clear();
            });

        const closeIcon = createElement('img')
            .addClass('clipboard_close_icon')
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
                this.clipboardMid.append(this.clipboardItemHeader, this.clipboardItems),
                this.clipboardEnd.append(this.clipboardCopyButton.on('click', this.writeToClipboard.bind(this)), this.clipboardClearButton.append(trashIcon))
            )
        );

        $('body').append(this.clipboard);
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

    refresh() {
        let i = (this.copiedText.length + this.copiedUrls.length + this.copiedColors.length + this.copiedCode.length) % 4; // This will cycle through 0, 1, 2, 3 as this.count increases
        appManager.clipboardIcon = `clipboard-icon-${i}.svg`;
        appManager.updateClipboardIcon();

        const createClipboardItem = (item, index, itemTypeSrc, itemsArray) => {
            const clipboardItem = $('<div>')
                .attr('class', 'clipboard_item');
            const itemType = $('<img>')
                .attr('class', 'clipboard_item_type')
                .attr('src', `${EXTENSION_ID}/assets/${itemTypeSrc}`);
            const itemContent = $('<div>')
                .attr('class', 'clipboard_item_content')
                .text(item);
            const itemRemove = $('<img>')
                .attr('class', 'clipboard_item_remove')
                .attr('src', `${EXTENSION_ID}/assets/close-classic-icon.svg`)
                .on('click', function () {
                    $(this).parent().remove();
                    itemsArray[index] = null;
                });

            clipboardItem.append(itemType, itemContent, itemRemove);
            this.clipboardItems.append(clipboardItem);

            if (item.length > 32) {
                itemContent.addClass('overflowing');
            }
        };

        for (let i = this.lastTextIndex; i < this.copiedText.length; i++) {
            createClipboardItem(this.copiedText[i], i, 'text-icon.svg', this.copiedText);
        }
        this.lastTextIndex = this.copiedText.length;

        for (let i = this.lastUrlIndex; i < this.copiedUrls.length; i++) {
            console.log(this.copiedUrls);
            createClipboardItem(this.copiedUrls[i], i, 'link-icon.svg', this.copiedUrls);
        }
        this.lastUrlIndex = this.copiedUrls.length;

        for (let i = this.lastColorIndex; i < this.copiedColors.length; i++) {
            createClipboardItem(this.copiedColors[i], i, 'color-icon.svg', this.copiedColors);
            
            const colorCircle = $('<div>').css({
                'background-color': this.copiedColors[i],
                'border-radius': '50%',
                'display': 'inline-block',
                'width': '12px',
                'height': '12px',
                'margin-right': '5px',
            });
        
            $('.clipboard_item_content').last().prepend(colorCircle);
        
        }
        this.lastColorIndex = this.copiedColors.length;


        for (let i = this.lastCodeIndex; i < this.copiedCode.length; i++) {
            console.log(this.copiedCode);
            createClipboardItem(this.copiedCode[i], i, 'code-icon.svg', this.copiedCode);
        }  
        this.lastCodeIndex = this.copiedCode.length;

    }


    add(val, list) {
        switch (list) {
            case 'text':
                this.copiedText.push(val);
                break;
            case 'urls':
                this.copiedUrls.push(val);
                break;
            case 'colors':
                this.copiedColors.push(val);
                break;
            case 'code':
                this.copiedCode.push(val);
                console.log(val);
                break;
            default:
                throw new Error('Invalid list specified');
        }
        this.refresh();
    }


    clear() {
        this.copiedText = [];
        this.copiedUrls = [];
        this.copiedColors = [];
        this.lastTextIndex = 0;
        this.lastUrlIndex = 0;
        this.lastColorIndex = 0;
        this.refresh();
    }




}