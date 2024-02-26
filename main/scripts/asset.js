





class Asset {
    constructor() {
        console.log("Asset");
        this.haveEventListeners = false;
        this.currentElement = null;
        this.AddEventListeners();

    }

    AddEventListeners = function () {
        let document = GetCurrentDocument();
        let elements = this.GetAllElements(document);


        for (let i = 0; i < elements.length; i++) {
            $(elements[i]).on("mouseover", (event) => this.ViewerMouseOver(event));
            $(elements[i]).on("mouseout", this.ViewerMouseOut);
            $(elements[i]).on("mousemove", this.ViewerMouseMove);
        }
        this.haveEventListeners = true;
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

    BuildInspectorWindow = function () {
        let document = GetCurrentDocument();
        let container;

        if (document) {

            container = document.createElement('div');
            container.id = 'InspectorWindow_container';

            let title3 = document.createElement('p');
            title3.appendChild(document.createTextNode('Assets'));
            title3.id = 'InspectorWindow_assetsTitle';
            container.appendChild(title3);

            let assets = document.createElement('div');
            assets.id = 'InspectorWindow_assets';

            container.appendChild(assets)

        }

        return container;
    }


    SetAssets(element) {
        var assets = this.getImages(element);

        for (var i = 0; i < assets.length; i++) {
            if (assets[i] != null) {
                var img = document.createElement('img');
                img.id = 'InspectorWindow_asset';
                img.src = assets[i];
                img.width = 50;
                img.height = 50;
                $('#InspectorWindow_assets').append(img);
            }
        }

        if (assets.length > 0)
            $('#InspectorWindow_assetsTitle').css('display', 'inline')
        else
            $('#InspectorWindow_assetsTitle').css('display', 'none')
    }


    getImages(element, includeDuplicates = false) {
        var images = [];

        images = [...element.getElementsByTagName('img')].map(img =>
            img.getAttribute('src')
        );

        if (element.tagName === "IMG") {
            console.log(element.getAttribute("src"));
            images.push(element.getAttribute("src"))
        }

        return includeDuplicates ? images : [...new Set(images)];
    }





    GetCurrentDocument() {
        return window.document;
    }


    ViewerMouseOver(e) {
        let element = e.currentTarget;
        appManager.asset.currentElement = element;
        appManager.nrAttributes = 0;

        e.stopPropagation();

        if (element.tagName != 'body') {
            element.style.setProperty('outline', '1px dotted #f00', 'important');
        }


        this.SetAssets(element);

    }

    /*
    * Triggered when mouse moves within element boundaries
    */
    ViewerMouseOut(e) {
        $('#InspectorWindow_assets').empty();
        $('#InspectorWindow_value').empty();

        this.style.outline = '';
        e.stopPropagation();

    }
    close() {
        console.log('closing viewer');
    }




}








