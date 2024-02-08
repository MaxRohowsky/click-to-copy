// https://stackoverflow.com/questions/667951/how-to-get-nodes-lying-inside-a-range-with-javascript
/*function highlightSelection() {
    const userSelection = window.getSelection().getRangeAt(0);
    const safeRanges = getSafeRanges(userSelection);
    for (let i = 0; i < safeRanges.length; i++) {
        highlightRange(safeRanges[i]);
        console.log(safeRanges[i]);
    }
}

function highlightRange(range) {
    const newNode = document.createElement("mark");
    newNode.setAttribute(
        "style",
        "background-color: yellow !important; display: inline;"
    );
    newNode.classList.add("highlighted");
    range.surroundContents(newNode);
}

function getSafeRanges(dangerous) {
    const a = dangerous.commonAncestorContainer;
    console.log(a);
    // Starts -- Work inward from the start, selecting the largest safe range
    let s = new Array(0), rs = new Array(0);
    if (dangerous.startContainer != a) {
        for (let i = dangerous.startContainer; i != a; i = i.parentNode) {
            s.push(i);
        }
    }
    if (s.length > 0) {
        for (let i = 0; i < s.length; i++) {
            let xs = document.createRange();
            if (i) {
                xs.setStartAfter(s[i - 1]);
                xs.setEndAfter(s[i].lastChild);
            } else {
                xs.setStart(s[i], dangerous.startOffset);
                xs.setEndAfter((s[i].nodeType == Node.TEXT_NODE) ? s[i] : s[i].lastChild);
            }
            rs.push(xs);
        }
    }

    // Ends -- basically the same code reversed
    let e = new Array(0), re = new Array(0);
    if (dangerous.endContainer != a) {
        for (let i = dangerous.endContainer; i != a; i = i.parentNode) {
            e.push(i);
        }
    }
    if (e.length > 0) {
        for (let i = 0; i < e.length; i++) {
            let xe = document.createRange();
            if (i) {
                xe.setStartBefore(e[i].firstChild);
                xe.setEndBefore(e[i - 1]);
            } else {
                xe.setStartBefore((e[i].nodeType == Node.TEXT_NODE) ? e[i] : e[i].firstChild);
                xe.setEnd(e[i], dangerous.endOffset);
            }
            re.unshift(xe);
        }
    }

    // Middle -- the uncaptured middle
    let xm;
    if ((s.length > 0) && (e.length > 0)) {
        xm = document.createRange();
        xm.setStartAfter(s[s.length - 1]);
        xm.setEndBefore(e[e.length - 1]);
    } else {
        return [dangerous];
    }

    // Concat
    rs.push(xm);
    let response = rs.concat(re);

    // Send to Console
    return response;
}


function highlightSelection2() {
    window.document.designMode = "On";
    window.document.execCommand("hiliteColor", false, "#768");
    window.document.designMode = "Off";
}
*/


class Text {
    constructor() {
        this.start();
    }

    start() {
        let copiedMessage;
        let copyString = "";
        const body = document.body;


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
        $('.highlighted').contents().unwrap();
    }


    showCopiedMessage(mouseX, mouseY) {
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
            copiedMessage.fadeOut(500, function () {
                copiedMessage.remove();
            });
        }, 1500);

        return copiedMessage;  // Add this line
    }


}