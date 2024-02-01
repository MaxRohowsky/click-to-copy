/*class Edit {

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
        console.log("executed");
        for (let i = 0; i < elements.length; i++) {
            $(elements[i]).on("mousedown", this.ClickEdit)
            //$(elements[i]).on("mouseover", this.BinMouseOver)
            //$(elements[i]).on("mouseout", this.BinMouseOut)
        }

        this.haveEventListeners = true;
    }

    ClickEdit = (e) => {
        let elementToEdit = $(e.target);
        let hasClass = !!elementToEdit.attr("class")
        let isBody = elementToEdit.prop("tagName") == 'BODY';
        
        if (!isBody) {
            // Check for ignored classes
            if (hasClass) {
                let classNames = elementToEdit.attr('class').split(' ');
                let hasIgnoredClass = classNames.some(className => this.ignoreClasses.includes(className));

                if (!hasIgnoredClass) {
                    elementToEdit.attr('contenteditable', 'true');
                    console.log('editable');
                }
                else {
                    console.log('not editable');
                }
            }
            // Remove if no class
            else {
                elementToEdit.attr('contenteditable', 'true');
                console.log('editable');
            }
        }
        
    }

    AddEventListeners = function () {
        let document = GetCurrentDocument();
        let elements = this.GetAllElements(document.body);

        for (let i = 0; i < elements.length; i++) {
            $(elements[i]).on("mousedown", this.ClickEdit)
            //$(elements[i]).on("mouseover", this.BinMouseOver)
            //$(elements[i]).on("mouseout", this.BinMouseOut)
        }

        this.haveEventListeners = true;
    }












    
}*/