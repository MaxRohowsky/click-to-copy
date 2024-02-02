class Clipboard {
    constructor() {
        this.copiedText           = [];
        this.copiedUrls           = [];
        this.copiedColors         = [];
        this.lastTextIndex        = 0;
        this.lastUrlIndex         = 0;
        this.lastColorIndex       = 0;
        this.clipboard            = $('<div>').attr('id', 'clipboard');
        this.clipboardContainer   = $('<div>').attr('id', 'clipboard_container');
        this.clipboardTop         = $('<div>').attr('id', 'clipboard_top');
        this.clipboardSub         = $('<div>').attr('id', 'clipboard_sub');
        this.clipboardMid         = $('<div>').attr('id', 'clipboard_mid');
        this.clipboardItemHeader  = $('<div>').attr('id', 'clipboard_item_header').text('Clipboard');
        this.clipboardItems       = $('<div>').attr('id', 'clipboard_items')
        this.clipboardEnd         = $('<div>').attr('id', 'clipboard_end');
        this.clipboardCopyButton  = $('<button>').attr('id', 'clipboard_copy_button').text('Copy');
        this.clipboardClearButton = $('<button>').attr('id', 'clipboard_clear_button');
        this.BuildClipboard();

    }

    BuildClipboard() {
        const trashIcon = $('<img>')
            .addClass('clipboard_trash_icon')
            .attr('src', `chrome-extension://laonhdndhpeoachehnobbcjdcnnhlioe/assets/trash-icon.svg`);

        const closeIcon = $('<img>')
            .addClass('clipboard_close_icon')
            .attr('src', `chrome-extension://laonhdndhpeoachehnobbcjdcnnhlioe/assets/close-classic-icon.svg`);


        this.clipboard.append(this.clipboardContainer);

        this.clipboardContainer.append(this.clipboardTop);
        this.clipboardTop.append(closeIcon);

        this.clipboardContainer.append(this.clipboardSub);

        this.clipboardContainer.append(this.clipboardMid);
        this.clipboardMid.append(this.clipboardItemHeader);
        this.clipboardMid.append(this.clipboardItems);

        this.clipboardContainer.append(this.clipboardEnd);
        this.clipboardEnd.append(this.clipboardCopyButton);
        this.clipboardEnd.append(this.clipboardClearButton);
        this.clipboardClearButton.append(trashIcon);


        $('body').append(this.clipboard);
        this.clipboard.draggable();

    }

    refresh() {
        for (let i = this.lastTextIndex; i < this.copiedText.length; i++) {
            let div = $('<div>').text(this.copiedText[i])
            .attr('class', 'clipboard_item clipboard_text');
            this.clipboardItems.append(div);
        }
        this.lastTextIndex = this.copiedText.length;

        for (let i = this.lastUrlIndex; i < this.copiedUrls.length; i++) {
            let div = $('<div>').text(this.copiedUrls[i])
            .attr('class', 'clipboard_item clipboard_url');
            this.clipboardItems.append(div);
        }
        this.lastUrlIndex = this.copiedUrls.length;

        for (let i = this.lastColorIndex; i < this.copiedColors.length; i++) {
            let div = $('<div>').text(this.copiedColors[i])
            .attr('class', 'clipboard_item clipboard_color');
            this.clipboardItems.append(div);
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
        this.refresh();
    }




}