class Clipboard {
    constructor() {
        this.copiedText = [];
        this.copiedUrls = [];
        this.copiedColors = [];
        this.lastTextIndex = 0;
        this.lastUrlIndex = 0;
        this.lastColorIndex = 0;
        this.container = $('<div>').attr('id', 'clipboard_container');
        this.BuildClipboard();
    }

    BuildClipboard() {
        $('body').append(this.container);
        this.container.draggable();

    }

    refresh() {
        for (let i = this.lastTextIndex; i < this.copiedText.length; i++) {
            let div = $('<div>').text(this.copiedText[i])
            .attr('class', 'clipboard_item clipboard_text');
            this.container.append(div);
        }
        this.lastTextIndex = this.copiedText.length;

        for (let i = this.lastUrlIndex; i < this.copiedUrls.length; i++) {
            let div = $('<div>').text(this.copiedUrls[i]).attr('class', 'clipboard_item clipboard_url');
            this.container.append(div);
        }
        this.lastUrlIndex = this.copiedUrls.length;

        for (let i = this.lastColorIndex; i < this.copiedColors.length; i++) {
            let div = $('<div>').text(this.copiedColors[i]).attr('class', 'clipboard_item clipboard_color');
            this.container.append(div);
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