class Text {
    constructor() {
        this.start();
    }

    start() {
        let copiedMessage;
        let   copyString = "";
        const body       = document.body;


        $(body).on('mousemove', (e) => {
            copyString = window.getSelection().toString();
        });

        $(body).on('mouseup', (e) => {
            if (copyString.length > 1 && copyString != " ") {
                //navigator.clipboard.writeText(copyString)
                appManager.clipboard.add(copyString, 'text')
                    //.then(() => {
                        if (copiedMessage) {
                            copiedMessage.remove();
                        }
                        copiedMessage = this.showCopiedMessage(e.clientX, e.clientY);

                    //})
                    //.catch(err => {
                        //console.error('Unable to copy text to clipboard', err);
                    //});
            }
            copyString = "";

        });

        $(body).on('mousedown', (e) => {
            copyString = "";
            window.getSelection().removeAllRanges();
            if (copiedMessage) {
                copiedMessage.remove();
                copiedMessage = null;
            }
        });
    }



    close() {
        console.log('closing text');
        const body = document.body;
        $(body).off('mousemove');
        $(body).off('mouseup');
        $(body).off('mousedown');
    }


    showCopiedMessage(mouseX, mouseY) {
        let copiedMessage = $('<div>').addClass('copied-message');
        $('body').append(copiedMessage);

        copiedMessage.css({
            position: 'absolute',
            left    : mouseX + 'px',
            top     : mouseY + 'px'
        });

        copiedMessage.css({
            'background-color': 'rgba(44, 44, 4, 0.95)',
            'font-size'       : '16px',
            'border-radius'   : '8px',
            'color'           : 'rgb(35,226,0)',
            'padding'         : '10px',
            'font-family'     : 'Arial, Helvetica, sans-serif',
            'z-index'         : '99999',
            'font-weight'     : 'bold',
        });

        copiedMessage.text('Copied to Clipboard');

        setTimeout(function () {
            copiedMessage.fadeOut(500, function () {
                copiedMessage.remove();
            });
        }, 1500);

        return copiedMessage;  // Add this line
    }


}