class Url {
    constructor() {
        this.ignoreClasses = ["menuButton", "appMenu", "menuImage"];
        this.ignoreTags = ["menuButton", "appMenu", "menuImage"];
    }

    Testfunction = function (event) {
        // Prevent the default behavior (visiting the link)

        event.preventDefault();
        event.stopPropagation();


        let linkUrl = this.href;
        navigator.clipboard.writeText(linkUrl).then(() => {
            appManager.clipboard.copiedUrls.push(linkUrl);
            appManager.clipboard.BuildClipboard();
        })

    }


    PreventDefault = function () {
        $('a').on('click', this.Testfunction);
    }

    RestoreDefault = function () {
        console.log("restore")

        $('a').off('click', this.Testfunction);

    }



}