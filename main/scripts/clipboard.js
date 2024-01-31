class Clipboard {
    constructor() {
        this.copiedText = ["helo", "world", "test"];
        this.copiedUrls = ["https://www.google.com", "https://www.youtube.com", "https://www.facebook.com"];
        this.BuildClipboard();
    }

    BuildClipboard() {
        console.log('Building clipboard');

        let container = $('<div>').attr('id', 'clipboard_container');
        


        for (let item of this.copiedText) {
            let div = $('<div>').text(item).attr('class', 'clipboard_item');
            container.append(div);
        }
        for (let item of this.copiedUrls) {
            let div = $('<div>').text(item).attr('class', 'clipboard_item');
            container.append(div);
        }
        
        $('body').append(container);
        container.draggable();

    }
}