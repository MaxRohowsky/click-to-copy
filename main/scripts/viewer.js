let VIEWER_ELEMENT

let VIEWER_HTML = new Array(
    'id',
    'class',
    'src',
    'href',
    'alt',
    'placeholder',
    'width',
    'height',
    'title',
    'type',
    'value',
    'target',
    'name',
    'disabled',
    'required',
    'max',
    'min',
    'action',
);


let VIEWER_TYPOGRAPHY = new Array(
    'font-size',
    'font-weight',  // default: 400
    'font-style',
    'font-family',
    'font-letiant',
    'color',
    'letter-spacing',
    'line-height',
    'text-decoration',
    'text-align',
    'text-indent',
    'text-transform',
    'vertical-align',
    'white-space',
    'word-spacing'
);

let VIEWER_BOX = new Array(
    'width',
    'height',

    'border',
    'border-top',
    'border-right',
    'border-bottom',
    'border-left',

    'padding',
    'padding-top',
    'padding-right',
    'padding-bottom',
    'padding-left',

    'margin',
    'margin-top',
    'margin-right',
    'margin-bottom',
    'margin-left',

    'max-height',
    'min-height',
    'max-width',
    'min-width',
);

let VIEWER_POSITIONING = new Array(
    'position',
    'top',
    'right',
    'bottom',
    'left',
    'float',
    'display',
    'clear',
    'z-index'
);

let VIEWER_TRANSFORMS = new Array(
    'transform',
    'translate',
    'rotate',
    'scale',
    'skew'
);

let VIEWER_TABLE = new Array(
    'border-collapse',
    'border-spacing',
    'caption-side',
    'empty-cells',
    'table-layout'
);

let VIEWER_EFFECT = new Array(
    'transform',
    'transition',
    'outline',
    'outline-offset',
    'box-sizing',
    'resize',
    'text-shadow',
    'text-overflow',
    'word-wrap',
    'box-shadow',
    'border-top-left-radius',
    'border-top-right-radius',
    'border-bottom-left-radius',
    'border-bottom-right-radius'
);



let VIEWER_CATEGORIES = {
    'Typography': VIEWER_TYPOGRAPHY,
    'Box': VIEWER_BOX,
    'Position': VIEWER_POSITIONING,
    'Transforms': VIEWER_TRANSFORMS,
    'Table': VIEWER_TABLE,
    'Effect': VIEWER_EFFECT
};


function GetCSSProperty(element, property) {
    var elementStyle = document.defaultView.getComputedStyle(element, null);
    return elementStyle.getPropertyValue(property)
}


function SetCSSPropertyIf(element, property, condition) {
    var value = GetCSSProperty(element, property)

    if (condition) {
        $('#InspectorWindow_' + property + ' .InspectorWindow_property').css('display', 'inline')
        $('#InspectorWindow_' + property + ' .InspectorWindow_cssValue').css('display', 'inline')

        $('#InspectorWindow_' + property + ' .InspectorWindow_property').text(property + ": ");
        $('#InspectorWindow_' + property + ' .InspectorWindow_cssValue').text(value);
    }
    else {
        $('#InspectorWindow_' + property + ' .InspectorWindow_property').css('display', 'none')
        $('#InspectorWindow_' + property + ' .InspectorWindow_cssValue').css('display', 'none')
    }
}


function SetCSSProperties(element) {
    SetCSSPropertyIf(element, 'font-size', true);
    SetCSSPropertyIf(element, 'font-weight', GetCSSProperty(element, 'font-weight') != '400');
    SetCSSPropertyIf(element, 'font-style', GetCSSProperty(element, 'font-style') != 'normal');
    SetCSSPropertyIf(element, 'color', true);
    SetCSSPropertyIf(element, 'font-family', true);
    SetCSSPropertyIf(element, 'font-variant', GetCSSProperty(element, 'text-variant') != 'normal');
    SetCSSPropertyIf(element, 'line-height', GetCSSProperty(element, 'text-variant') != 'line-height');
    SetCSSPropertyIf(element, 'text-decoration', GetCSSProperty(element, 'text-decoration') != 'none');
    SetCSSPropertyIf(element, 'text-align', GetCSSProperty(element, 'text-align') != 'start');
    SetCSSPropertyIf(element, 'text-indent', GetCSSProperty(element, 'text-indent') != '0px');
    SetCSSPropertyIf(element, 'text-transform', GetCSSProperty(element, 'text-transform') != 'none');
    SetCSSPropertyIf(element, 'vertical-align', GetCSSProperty(element, 'vertical-align') != 'baseline');
    SetCSSPropertyIf(element, 'white-space', GetCSSProperty(element, 'white-space') != 'normal');
    SetCSSPropertyIf(element, 'word-spacing', GetCSSProperty(element, 'word-spacing') != '0px');
    SetCSSPropertyIf(element, 'height', GetCSSProperty(element, 'height') != 'auto');
    SetCSSPropertyIf(element, 'width', GetCSSProperty(element, 'width') != 'auto');
    //SetCSSPropertyIf(element, 'border', true);
    //SetCSSPropertyIf(element, 'border-top', true);
    //SetCSSPropertyIf(element, 'border-right', true);
    //SetCSSPropertyIf(element, 'border-bottom', true);
    //SetCSSPropertyIf(element, 'border-left',true);
    SetCSSPropertyIf(element, 'margin', true);
    SetCSSPropertyIf(element, 'padding', true);
    SetCSSPropertyIf(element, 'max-height', GetCSSProperty(element, 'max-height') != 'none');
    SetCSSPropertyIf(element, 'min-height', GetCSSProperty(element, 'min-height') != 'none');
    SetCSSPropertyIf(element, 'max-width', GetCSSProperty(element, 'max-width') != 'none');
    SetCSSPropertyIf(element, 'min-width', GetCSSProperty(element, 'min-width') != 'none');
    SetCSSPropertyIf(element, 'top', GetCSSProperty(element, 'top') != 'auto');
    SetCSSPropertyIf(element, 'bottom', GetCSSProperty(element, 'bottom') != 'auto');
    SetCSSPropertyIf(element, 'right', GetCSSProperty(element, 'right') != 'auto');
    SetCSSPropertyIf(element, 'left', GetCSSProperty(element, 'left') != 'auto');
    SetCSSPropertyIf(element, 'z-index', GetCSSProperty(element, 'z-index') != 'auto');
}


function GetCurrentDocument() {
    return window.document;
}


function ViewerMouseOver(e) {
    let element = this;
    appManager.code.currentElement = element;
    appManager.nrAttributes = 0;

    e.stopPropagation();

    if (this.tagName != 'body' && !IGNORE_CLASSES.some(cls => $(element).hasClass(cls))) {
        this.style.setProperty('outline', '1px dotted #f00', 'important');
    }

    if(!IGNORE_CLASSES.some(cls => $(element).hasClass(cls))){
        $('#InspectorWindow').css("display", "block");
    } else {
        $('#InspectorWindow').css("display", "none");
    }

    SetCSSProperties(element);

}


function ViewerMouseOut(e) {
    $('#InspectorWindow_value').empty();

    this.style.outline = '';
    e.stopPropagation();

}


function ViewerMouseMove(e) {
    let block = $('#InspectorWindow');
    let pageWidth = window.innerWidth;
    let pageHeight = window.innerHeight;
    let blockWidth = $(block).width();
    let blockHeight = $(block).height();

    let xOffset = 20;
    let yOffset = 20;

    block.css('position', 'absolute');


    // Set X position of InspectorWindow
    if ((e.clientX + parseFloat(blockWidth) + xOffset) > parseFloat(pageWidth)) {
        if ((e.clientX - parseFloat(blockWidth) - xOffset) > 0)
            block.css('left', e.clientX - parseFloat(blockWidth) - xOffset + 'px');
        else
            block.css('left', '0px');
    }
    else
        block.css('left', (e.pageX + xOffset) + 'px');

    // Set Y position of InspectorWindow
    if ((e.clientY + parseFloat(blockHeight) + yOffset) > parseFloat(pageHeight)) {
        if ((e.clientY - parseFloat(blockHeight) - yOffset) > 0)
            block.css('top', e.pageY - parseFloat(blockHeight) - yOffset + 'px');
        else
            block.css('top', '0px');
    }
    else
        block.css('top', (e.pageY + yOffset) + 'px');

    //e.stopPropagation(); // Stop the event from bubbling up the DOM tree - but here it interferes with the movability of clipboard


}



class Code {
    constructor() {
        this.haveEventListeners = false;
        this.currentElement = null;
        this.inspector = null;
        this.BuildInspectorWindow();
        this.AddEventListeners();
    }


    GetAllElements(element) {
        let elements = new Array();

        if (element && element.hasChildNodes() && !IGNORE_CLASSES.some(cls => $(element).hasClass(cls))) {
            elements.push(element);

            let childs = element.childNodes;

            for (let i = 0; i < childs.length; i++) {
                if (childs[i].hasChildNodes() && !IGNORE_CLASSES.some(cls => $(childs[i]).hasClass(cls))) {
                    elements = elements.concat(this.GetAllElements(childs[i]));
                }
                else if (childs[i].nodeType == 1) {
                    elements.push(childs[i]);

                }
            }
        }
        return elements;
    }


    BuildCSSProperty(container, property) {
        let p = $('<p>').attr('id', 'InspectorWindow_' + property);

        let spanName = $('<span>').addClass('InspectorWindow_property');

        let spanValue = $('<span>')
            .addClass('InspectorWindow_cssValue')
            .attr('contentEditable', true);

        p.append(spanName);
        p.append(spanValue);

        $(container).append(p);
    }


    BuildInspectorWindow() {
        let document = GetCurrentDocument();

        if (document) {

            this.inspector = $('<div>').attr('id', 'InspectorWindow');


            let title2 = $('p').attr('id', 'InspectorWindow_htmlTitle');
            title2.append(document.createTextNode('CSS'));
            this.inspector.append(title2);

            for (let i = 0; i < VIEWER_TYPOGRAPHY.length; i++) {
                this.BuildCSSProperty(this.inspector, VIEWER_TYPOGRAPHY[i])
            }

            for (let i = 0; i < VIEWER_BOX.length; i++) {
                this.BuildCSSProperty(this.inspector, VIEWER_BOX[i])
            }

            for (let i = 0; i < VIEWER_POSITIONING.length; i++) {
                this.BuildCSSProperty(this.inspector, VIEWER_POSITIONING[i])
            }

        }
        $('body').append(this.inspector);

    }

    AddEventListeners() {
        this.haveEventListeners = true;
        let document = GetCurrentDocument();
        let elements = this.GetAllElements(document);


        for (let i = 0; i < elements.length; i++) {
            $(elements[i]).on("mouseover", ViewerMouseOver);
            $(elements[i]).on("mouseout", ViewerMouseOut);
            $(elements[i]).on("mousemove", ViewerMouseMove);
        }

    }


    RemoveEventListeners() {
        let document = GetCurrentDocument();
        let elements = this.GetAllElements(document);

        for (let i = 0; i < elements.length; i++) {
            $(elements[i]).off("mouseover", ViewerMouseOver);
            $(elements[i]).off("mouseout", ViewerMouseOut);
            $(elements[i]).off("mousemove", ViewerMouseMove);
        }
        this.haveEventListeners = false;
    }






    close() {
        console.log('closing viewer');
        this.RemoveEventListeners();
        this.inspector.remove();
    }




}










