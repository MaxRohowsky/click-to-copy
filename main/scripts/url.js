class Url {
    constructor() {
        this.addEventListeners();
        
    }

    Testfunction(event) {
        let ignoreClasses = ["menuButton", "appMenu", "menuImage", "clipboard_item", "clipboard_item_type", "clipboard_item_content", "clipboard_item_remove"];
        let ignoreTags = ["menuButton", "appMenu", "menuImage"];

        for (let ignoreClass of ignoreClasses) {
            if ($(event.target).hasClass(ignoreClass)) {
                return;
            }
        }
        if (ignoreTags.includes(event.target.tagName.toLowerCase())) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        let linkElement = $(event.target).closest('[href]');
        if (linkElement.length) {
            let linkUrl = new URL(linkElement.attr('href'), window.location.origin).href;

            navigator.clipboard.writeText(linkUrl)
            
            let copiedUrl = new CopiedObj('url', linkUrl);
            appManager.clipboard.instance.copiedObjs.push(copiedUrl);
            appManager.clipboard.instance.refreshClipboard();

        }
    }

    /*addScrollListener() {
        $(window).on('scroll', () => {
            $('a').each(function() {
                if ($(this).attr('id') !== 'clipboardEnd__signature') {
                    $(this).addClass('dashed_outline');
                }
            });
        });
    }*/

    addEventListeners() {
        $('a').each(function() {
            if ($(this).attr('id') !== 'clipboardEnd__signature') {
                $(this).addClass('dashed_outline')
                .on('click', (e) => {
                    this.Testfunction(e);
                });
            }
        });
    }

    close() {
        console.log('closing url');
        $('a').off('click').removeClass('dashed_outline');
    }
}