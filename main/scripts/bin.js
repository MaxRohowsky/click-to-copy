class Bin {
    constructor() {
        this.haveEventListeners = false;
        this.currentElement = null;
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
        let document = GetCurrentDocument();
        let elements = this.GetAllElements(document.body);


        for (let i = 0; i < elements.length; i++) {
            //$(elements[i]).on("mouseover", this.BinMouseOver);
            //$(elements[i]).on("mouseout", this.BinMouseOut);
            $(elements[i]).on("mousedown", this.ClickRemove)
        }
        this.haveEventListeners = true;
    }

    BinMouseOver = (e) => {
        let element = e.currentTarget;
        this.currentElement = element;
        e.stopPropagation();

        if (this.currentElement.tagName != 'body') {
            this.currentElement.style.setProperty('outline', '1px dotted #f00', 'important');
        }
    };

    BinMouseOut = (e) => {
        this.currentElement.style.outline = '';
        e.stopPropagation();
    };

    ClickRemove = (e) => {
        console.log('click');
        let elementToRemove = $(e.target);
        console.log(elementToRemove)
        elementToRemove.css('visibility', 'hidden');

    }



    RemoveEventListeners = function () {
        let document = GetCurrentDocument();
        let elements = this.GetAllElements(document.body);

        for (let i = 0; i < elements.length; i++) {
            $(elements[i]).off("mouseover", ViewerMouseOver);
            $(elements[i]).off("mouseout", ViewerMouseOut);
            $(elements[i]).off("mousemove", ViewerMouseMove);
        }
        this.haveEventListeners = false;
    }




}
