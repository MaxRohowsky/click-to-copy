const EXTENSION_ID = 'chrome-extension://laonhdndhpeoachehnobbcjdcnnhlioe';

const IGNORE_CLASSES = ["appMenu", "menuBUtton", "menuImage", "clipboard"]

class Clipboard {
    constructor() {
        this.copiedText = [];
        this.copiedUrls = [];
        this.copiedColors = [];
        this.lastTextIndex = 0;
        this.lastUrlIndex = 0;
        this.lastColorIndex = 0;
        this.clipboard = $('<div>').attr('id', 'clipboard').addClass('clipboard hidden clipboardInitial');
        this.clipboardContainer = $('<div>').attr('id', 'clipboard_container');
        this.clipboardTop = $('<div>').attr('id', 'clipboard_top');
        this.clipboardSub = $('<div>').attr('id', 'clipboard_sub');
        this.clipboardMid = $('<div>').attr('id', 'clipboard_mid');
        this.clipboardItemHeader = $('<div>').attr('id', 'clipboard_item_header').text('Clipboard');
        this.clipboardItems = $('<div>').attr('id', 'clipboard_items')
        this.clipboardEnd = $('<div>').attr('id', 'clipboard_end');
        this.clipboardCopyButton = $('<button>').attr('id', 'clipboard_copy_button').text('Copy');
        this.clipboardClearButton = $('<button>').attr('id', 'clipboard_clear_button');
        this.buildClipboard();
    }

    buildClipboard() {
        const trashIcon = $('<img>')
            .addClass('clipboard_trash_icon')
            .attr('src', `${EXTENSION_ID}/assets/trash-icon.svg`)
            .on("click", () => {
                this.clipboardItems.empty();
                this.clear();
            });

        const closeIcon = $('<img>')
            .addClass('clipboard_close_icon')
            .attr('src', `${EXTENSION_ID}/assets/close-classic-icon.svg`)
            .on('click', () => {
                this.clipboard.addClass('hidden')
                appManager.clipboardButton.removeClass('active');
                appManager.clipboardOn = false;
            });

        this.clipboard.append(this.clipboardContainer);
        this.clipboardContainer.append(this.clipboardTop);
        this.clipboardTop.append(closeIcon);
        this.clipboardTop
            .on('mousedown', () => moveElement(this.clipboard, "clipboardInitial"))
            .on('mouseup', () => freezeElement(this.clipboard));
        this.clipboardContainer.append(this.clipboardSub);
        this.clipboardContainer.append(this.clipboardMid);
        this.clipboardMid.append(this.clipboardItemHeader, this.clipboardItems);
        this.clipboardContainer.append(this.clipboardEnd);
        this.clipboardEnd.append(this.clipboardCopyButton, this.clipboardClearButton);
        this.clipboardCopyButton.on('click', this.writeToClipboard.bind(this));
        this.clipboardClearButton.append(trashIcon);

        $('body').append(this.clipboard);

    }

    writeToClipboard() {
        let filteredTextArray = this.copiedText.filter(item => item !== null);
        let filteredUrlsArray = this.copiedUrls.filter(item => item !== null);
        let filteredColorsArray = this.copiedColors.filter(item => item !== null);
        let textToCopy = filteredTextArray.join('\n');
        let urlsToCopy = filteredUrlsArray.join('\n');
        let colorsToCopy = filteredColorsArray.join('\n');
        let combinedText = textToCopy + '\n' + urlsToCopy + '\n' + colorsToCopy;

        navigator.clipboard.writeText(combinedText)
            .then(() => {
                console.log('Text copied to clipboard');
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    }

    refresh() {
        let self = this;

        for (let i = this.lastTextIndex; i < this.copiedText.length; i++) {
            let clipboardItem = $('<div>').attr('class', `clipboard_item`);
            let itemType = $('<img>').attr('class', 'clipboard_item_type').attr('src', `${EXTENSION_ID}/assets/text-icon.svg`);;
            let itemContent = $('<div>').attr('class', 'clipboard_item_content').text(this.copiedText[i]);
            let itemRemove = $('<img>').attr('class', 'clipboard_item_remove').attr('src', `${EXTENSION_ID}/assets/close-classic-icon.svg`);


            itemRemove.on('click', function () {
                $(this).parent().remove();
                self.copiedText[i] = null;
            });

            clipboardItem.append(itemType, itemContent, itemRemove);
            this.clipboardItems.append(clipboardItem);

            if (this.copiedText[i].length > 32) {
                itemContent.addClass('overflowing');
            }
        }
        this.lastTextIndex = this.copiedText.length;

        for (let i = this.lastUrlIndex; i < this.copiedUrls.length; i++) {
            let clipboardItem = $('<div>').attr('class', 'clipboard_item');
            let itemType = $('<img>').attr('class', 'clipboard_item_type').attr('src', `${EXTENSION_ID}/assets/link-icon.svg`);
            let itemContent = $('<div>').attr('class', 'clipboard_item_content').text(this.copiedUrls[i]);
            let itemRemove = $('<img>').attr('class', 'clipboard_item_remove').attr('src', `${EXTENSION_ID}/assets/close-classic-icon.svg`);


            itemRemove.on('click', function () {
                $(this).parent().remove();
                self.copiedUrls[i] = null;
                console.log(self.copiedUrls);
            });

            clipboardItem.append(itemType, itemContent, itemRemove);
            this.clipboardItems.append(clipboardItem);

            if (this.copiedUrls[i].length > 32) {
                itemContent.addClass('overflowing');
            }

        }
        this.lastUrlIndex = this.copiedUrls.length;


        for (let i = this.lastColorIndex; i < this.copiedColors.length; i++) {
            let clipboardItem = $('<div>').attr('class', 'clipboard_item');
            let itemType = $('<img>').attr('class', 'clipboard_item_type').attr('src', `${EXTENSION_ID}/assets/color-icon.svg`);
            let itemContent = $('<div>').attr('class', 'clipboard_item_content').text(this.copiedColors[i]);
            let colorCircle = $('<div>').css({
                'background-color': this.copiedColors[i],
                'border-radius': '50%',
                'display': 'inline-block',
                'width': '12px',
                'height': '12px',
                'margin-right': '5px',
            });
            itemContent.prepend(colorCircle);
            let itemRemove = $('<img>').attr('class', 'clipboard_item_remove').attr('src', `${EXTENSION_ID}/assets/close-classic-icon.svg`);


            itemRemove.on('click', function () {
                $(this).parent().remove();
                self.copiedColors[i] = null;
            });

            clipboardItem.append(itemType, itemContent, itemRemove);
            this.clipboardItems.append(clipboardItem);
        }
        this.lastColorIndex = this.copiedColors.length;
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