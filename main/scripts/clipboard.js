class Clipboard {
    constructor() {
        this.copiedText = [];
        this.copiedUrls = [];
        this.copiedColors = [];
        this.container = $('<div>').attr('id', 'clipboard_container');
        this.BuildClipboard();
    }

    BuildClipboard() {
        console.log(this.copiedText);


        for (let item of this.copiedText) {
            let div = $('<div>').text(item).attr('class', 'clipboard_item');
            this.container.append(div);
        }
        for (let item of this.copiedUrls) {
            let div = $('<div>').text(item).attr('class', 'clipboard_item');
            this.container.append(div);
        }
        
        $('body').append(this.container);
        this.container.draggable();

    }

    refreshClipboard() {
        // Clear existing clipboard items
        console.log("refresh");

        this.container.empty();

        // Add new clipboard items
        for (let item of this.copiedText) {
            let div = $('<div>').text(item).attr('class', 'clipboard_item');
            this.container.append(div);
        }
        for (let item of this.copiedUrls) {
            let div = $('<div>').text(item).attr('class', 'clipboard_item');
            this.container.append(div);
        }
        $('body').append(this.container);
    }


    ClearClipboard() {
        this.copiedText = [];
        this.copiedUrls = [];
        this.refreshClipboard();
    }




}