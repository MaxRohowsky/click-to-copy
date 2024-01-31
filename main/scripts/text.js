class Text {
    constructor() {
        this.ignoreClasses = ["menuButton", "appMenu", "menuImage"];
        this.ignoreTags = ["menuButton", "appMenu", "menuImage"];
    }

    GetAllElements = function (element) {
        let elements = new Array();

        if (element && element.hasChildNodes()) {
            elements.push(element);

            let childs = element.childNodes;

            for (let i = 0; i < childs.length; i++) {
                if (childs[i].hasChildNodes()) {
                    elements = elements.concat(this.GetAllElements(childs[i]));
                }
                else if (childs[i].nodeType == 1) {
                    elements.push(childs[i]);
                }
            }
        }
        return elements;
    }

    AddEventListeners = function () {
        let copyString;
        let body = document.body;

        $(body).on('mousemove', function (e) {
            copyString = window.getSelection().toString();
        })

        $(body).on('mouseup', (e) => {
            if (copyString.length > 1) {
                navigator.clipboard.writeText(copyString)
                    .then(() => {
                        this.ShowCopiedMessage(e.clientX, e.clientY);
                        appManager.clipboard.copiedText.push(copyString);
                        appManager.clipboard.BuildClipboard();
                    })
                    .catch(err => {
                        console.error('Unable to copy to clipboard', err);
                    });
                
                
            }
        })
    }

    RemoveEventListeners = function () {
        let body = document.body;
        $(body).off('mousemove');
        $(body).off('mouseup');
    }


    ShowCopiedMessage = function (mouseX, mouseY) {
        let copiedMessage = $('<div>').addClass('copied-message');
        $('body').append(copiedMessage);

        copiedMessage.css({
            position: 'absolute',
            left: mouseX + 'px',
            top: mouseY + 'px'
        });


        copiedMessage.css({
            'background-color': 'rgba(44, 44, 4, 0.95)',
            'font-size': '16px',
            'border-radius': '8px',
            'color': 'rgb(35,226,0)',
            'padding': '10px',
            'font-family': 'Arial, Helvetica, sans-serif',
            'z-index': '99999',
            'font-weight': 'bold',
        });

        copiedMessage.text('Copied to Clipboard');

        setTimeout(function () {
            copiedMessage.fadeOut(500, function() {
                copiedMessage.remove();
            });
        }, 3000);
    }


}