class Url {
    constructor() {
        this.PreventDefault();
    }

    Testfunction(event) {
        let ignoreClasses = ["menuButton", "appMenu", "menuImage"];
        let ignoreTags = ["menuButton", "appMenu", "menuImage"];


        // If the clicked element has an ignored class or tag, return early
        for (let ignoreClass of ignoreClasses) {
            if ($(event.target).hasClass(ignoreClass)) {
                return;
            }
        }
        if (ignoreTags.includes(event.target.tagName.toLowerCase())) {
            return;
        }

        // Prevent the default behavior (visiting the link)
        event.preventDefault();
        event.stopPropagation();

        let linkElement = $(event.target).closest('[href]');
        console.log(linkElement);
        if (linkElement.length) {
            let linkUrl = linkElement.attr('href');
            navigator.clipboard.writeText(linkUrl).then(() => {
                console.log(linkUrl);
                appManager.clipboard.copiedUrls.push(linkUrl);
            })
        }
    }

    PreventDefault() {
        $('a, link, img, iframe, form, div, span').on('click', (e) => {
            this.Testfunction(e);
        });
    }

    RestoreDefault() {
        console.log("restore")
        $('a, link, img, iframe, form, div, span').off('click', this.Testfunction);
    }
}