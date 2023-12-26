class Bin {
    constructor() {
        this.haveEventListeners = false;
        this.elementMouseOver = null;
        this.ignoreClasses = ["menuButton", "appMenu", "menuImage"]
        this.ignoreTags = ["menuButton", "appMenu", "menuImage"]
    }

    GetAllElements = function (element) {
        let elements = new Array();
        console.log(element);

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
            $(elements[i]).on("mousedown", this.ClickRemove)
            $(elements[i]).on("mouseover", this.BinMouseOver)
            $(elements[i]).on("mouseout", this.BinMouseOut)
        }

        this.haveEventListeners = true;
    }


    BinMouseOver = (e) => {
        this.elementMouseOver = $(e.target);

        let hasClass = !!this.elementMouseOver.attr("class")
        let hasIgnoredClass;

        if (hasClass) {
            let classNames = this.elementMouseOver.attr('class').split(' ');
            hasIgnoredClass = classNames.some(className => this.ignoreClasses.includes(className));
            
        }


        if (this.elementMouseOver.prop("tagName") !== 'BODY' && !hasIgnoredClass) {
            console.log(!hasIgnoredClass);
            this.elementMouseOver.css('outline', '1px dotted #f00');
        }
    };

    BinMouseOut = (e) => {
        if(this.elementMouseOver){
            this.elementMouseOver.css('outline', '');
        }

        //e.stopPropagation();
    };

    ClickRemove = (e) => {
        let elementToRemove = $(e.target);
        let hasClass = !!elementToRemove.attr("class")
        let isBody = elementToRemove.prop("tagName") == 'BODY';

        if (!isBody) {
            // Check for ignored classes
            if (hasClass) {
                let classNames = elementToRemove.attr('class').split(' ');
                let hasIgnoredClass = classNames.some(className => this.ignoreClasses.includes(className));

                if (!hasIgnoredClass) {
                    elementToRemove.css('visibility', 'hidden');
                    console.log('removed');
                }
                else {
                    console.log('ignored');
                }
            }
            // Remove if no class
            else {
                elementToRemove.css('visibility', 'hidden');
                console.log('removed');
            }
        }

    }



    RemoveEventListeners = function () {
        let document = GetCurrentDocument();
        let elements = this.GetAllElements(document.body);

        for (let i = 0; i < elements.length; i++) {
            $(elements[i]).off("mousedown")
            $(elements[i]).off("mouseover")
            $(elements[i]).off("mouseout")
        }
        this.haveEventListeners = false;
    }




}
