function showCopiedMessage(mouseX, mouseY) {
        let message = $('<div>').addClass('copied-message');
        $('body').append(message);

        message.css({
            position: 'absolute',
            left: mouseX + 'px',
            top: mouseY + -50 + 'px'
        });

        message.css({
            'background-color': 'rgba(255, 255, 255) !important',
            'box-shadow': 'rgba(0, 0, 0, 0.1) 0px 0px 14px 2px',
            'font-size': '14px',
            'border-radius': '8px',
            'color': 'rgb(0,0,0)',
            'padding': '10px',
            'font-family': 'Arial, Helvetica, sans-serif',
            'z-index': '99999',
            'font-weight': 'bold'
        });

        message.text('Copied to Clipboard');

        setTimeout(function () {
            message.fadeOut(500, function () {
                message.remove();
            });
        }, 1500);

        return message;  // Add this line
    }



class Text {
    constructor() {
        this.start();
    }

    start() {
        let message;
        let copiedString = "";
        const body = document.body;


        $(body).on('mousemove', (e) => {
            copiedString = window.getSelection().toString();

        });

        $(body).on('mouseup', (e) => {

            if (copiedString.length > 1 && copiedString != " ") {
                navigator.clipboard.writeText(copiedString)

                let copiedText = new CopiedObj('text', copiedString);
                appManager.clipboard.instance.copiedObjs.push(copiedText);
                appManager.clipboard.instance.refreshClipboard();

                if (message) {
                    message.remove();
                }
                else message = showCopiedMessage(e.pageX, e.pageY);


            }
            copiedString = "";

        });

        $(body).on('mousedown', (e) => {
            copiedString = "";
            window.getSelection().removeAllRanges();
            if (message) {

                message.remove();
                message = null;
            }
        });
    }



    close() {
        console.log('closing text');
        const body = document.body;
        $(body).off('mousemove');
        $(body).off('mouseup');
        $(body).off('mousedown');
        $('.highlighted').contents().unwrap();
    }

    /*
    showCopiedMessage(mouseX, mouseY) {
        let message = $('<div>').addClass('copied-message');
        $('body').append(message);

        message.css({
            position: 'absolute',
            left: mouseX + 'px',
            top: mouseY + 'px'
        });

        message.css({
            'background-color': 'rgba(44, 44, 4, 0.95)',
            'font-size': '16px',
            'border-radius': '8px',
            'color': 'rgb(35,226,0)',
            'padding': '10px',
            'font-family': 'Arial, Helvetica, sans-serif',
            'z-index': '99999',
            'font-weight': 'bold',
        });

        message.text('Copied to Clipboard');

        setTimeout(function () {
            message.fadeOut(500, function () {
                message.remove();
            });
        }, 1500);

        return message;  // Add this line
    }*/


}