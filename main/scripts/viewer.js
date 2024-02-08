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


function SetCSSPropertyValueIf(element, property, value, condition) {
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


function rgbToHex(rgb) {
    // Remove the "rgb(" prefix and ")" suffix, and split by comma
    const parts = rgb.slice(4, -1).split(',');

    // Convert each part to a hexadecimal string and pad with zeros if necessary
    const hexParts = parts.map(part => {
        const hex = parseInt(part, 10).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    });

    // Join the hexadecimal parts into a single string and prefix with "#"
    return '#' + hexParts.join('');
}

//Ctrl d and alt a / ctrl shift l
function updateTypography(element) {
    
    SetCSSPropertyValueIf(element, 'font-size'          ,       GetCSSProperty(element, 'font-size')              ,      true);
    SetCSSPropertyValueIf(element, 'font-weight'        ,       GetCSSProperty(element, 'font-weight')            ,      GetCSSProperty(element, 'font-weight')     != '400');
    SetCSSPropertyValueIf(element, 'font-style'         ,       GetCSSProperty(element, 'font-style')             ,      GetCSSProperty(element, 'font-style')      != 'normal');
    SetCSSPropertyValueIf(element, 'font-family'        ,       GetCSSProperty(element, 'font-family')            ,      true);
    SetCSSPropertyValueIf(element, 'color'              ,       rgbToHex(GetCSSProperty(element, 'color'))        ,      rgbToHex(GetCSSProperty(element, 'color')) != '#000000');
    SetCSSPropertyValueIf(element, 'letter-spacing'     ,       GetCSSProperty(element, 'letter-spacing')         ,      GetCSSProperty(element, 'letter-spacing')  != 'normal');
    SetCSSPropertyValueIf(element, 'line-height'        ,       GetCSSProperty(element, 'line-height')            ,      GetCSSProperty(element, 'line-height')     != 'normal');
    SetCSSPropertyValueIf(element, 'text-decoration'    ,       GetCSSProperty(element, 'text-decoration')        ,      GetCSSProperty(element, 'text-decoration') != 'none solid rgb(0, 0, 0)');
    SetCSSPropertyValueIf(element, 'text-align'         ,       GetCSSProperty(element, 'text-align')             ,      GetCSSProperty(element, 'text-align')      != 'start');
    SetCSSPropertyValueIf(element, 'text-indent'        ,       GetCSSProperty(element, 'text-indent')            ,      GetCSSProperty(element, 'text-indent')     != '0px');
    SetCSSPropertyValueIf(element, 'text-transform'     ,       GetCSSProperty(element, 'text-transform')         ,      GetCSSProperty(element, 'text-transform')  != 'none');
    SetCSSPropertyValueIf(element, 'vertical-align'     ,       GetCSSProperty(element, 'vertical-align')         ,      GetCSSProperty(element, 'vertical-align')  != 'baseline');
    SetCSSPropertyValueIf(element, 'white-space'        ,       GetCSSProperty(element, 'white-space')            ,      GetCSSProperty(element, 'white-space')     != 'normal');
    SetCSSPropertyValueIf(element, 'word-spacing'       ,       GetCSSProperty(element, 'word-spacing')           ,      GetCSSProperty(element, 'word-spacing')    != '0px');
}

function updateBox(element) {
    SetCSSPropertyValueIf(element, 'width'              ,       GetCSSProperty(element, 'font-size')              ,      GetCSSProperty(element, 'width')           != 'auto');
    SetCSSPropertyValueIf(element, 'height'             ,       GetCSSProperty(element, 'font-size')              ,      GetCSSProperty(element, 'height')          != 'auto');
    SetCSSPropertyValueIf(element, 'margin'             ,       GetCSSProperty(element, 'font-size')              ,      GetCSSProperty(element, 'margin')          != '0px');
    SetCSSPropertyValueIf(element, 'padding'            ,       GetCSSProperty(element, 'font-size')              ,      GetCSSProperty(element, 'padding')         != '0px');
    SetCSSPropertyValueIf(element, 'max-height'         ,       GetCSSProperty(element, 'font-size')              ,      GetCSSProperty(element, 'max-height')      != 'none');
    SetCSSPropertyValueIf(element, 'min-height'         ,       GetCSSProperty(element, 'font-size')              ,      GetCSSProperty(element, 'min-height')      != '0px');
    SetCSSPropertyValueIf(element, 'max-width'          ,       GetCSSProperty(element, 'font-size')              ,      GetCSSProperty(element, 'max-width')       != 'none');    
    SetCSSPropertyValueIf(element, 'min-width'          ,       GetCSSProperty(element, 'font-size')              ,      GetCSSProperty(element, 'min-width')       != '0px');
    
}

function updatePositioning(element) {
    SetCSSPropertyValueIf(element, 'position'           ,       GetCSSProperty(element, 'position')               ,      GetCSSProperty(element, 'position')        != 'static');


    SetCSSPropertyValueIf(element, 'top'                ,       GetCSSProperty(element, 'top')                    ,      GetCSSProperty(element, 'top')             != 'auto');
    SetCSSPropertyValueIf(element, 'bottom'             ,       GetCSSProperty(element, 'bottom')                 ,      GetCSSProperty(element, 'bottom')          != 'auto');
    SetCSSPropertyValueIf(element, 'right'              ,       GetCSSProperty(element, 'right')                  ,      GetCSSProperty(element, 'right')           != 'auto');
    SetCSSPropertyValueIf(element, 'left'               ,       GetCSSProperty(element, 'left')                   ,      GetCSSProperty(element, 'left')            != 'auto');
    


    SetCSSPropertyValueIf(element, 'float'              ,       GetCSSProperty(element, 'float')                  ,      GetCSSProperty(element, 'float')           != 'none');
    SetCSSPropertyValueIf(element, 'display'            ,       GetCSSProperty(element, 'display')                ,      GetCSSProperty(element, 'display')         != 'block');
    SetCSSPropertyValueIf(element, 'clear'              ,       GetCSSProperty(element, 'clear')                  ,      GetCSSProperty(element, 'clear')           != 'none');
    SetCSSPropertyValueIf(element, 'z-index'            ,       GetCSSProperty(element, 'z-index')                ,      GetCSSProperty(element, 'z-index')         != 'auto');
}


function updateTransforms(element) {
    console.log(GetCSSProperty(element, 'skew' ));
    SetCSSPropertyValueIf(element, 'transform'           ,       GetCSSProperty(element, 'transform')               ,      GetCSSProperty(element, 'transform')        != 'none');
    SetCSSPropertyValueIf(element, 'translate'           ,       GetCSSProperty(element, 'translate')               ,      GetCSSProperty(element, 'translate')        != 'none');
    SetCSSPropertyValueIf(element, 'rotate'              ,       GetCSSProperty(element, 'rotate')                  ,      GetCSSProperty(element, 'rotate')           != 'none');
    SetCSSPropertyValueIf(element, 'scale'               ,       GetCSSProperty(element, 'scale')                   ,      GetCSSProperty(element, 'scale')            != 'none');
    SetCSSPropertyValueIf(element, 'skew'                ,       GetCSSProperty(element, 'skew')                    ,      GetCSSProperty(element, 'skew')             != '');
}


function updateTable(element) {
    SetCSSPropertyValueIf(element, 'border-collapse'     ,       GetCSSProperty(element, 'border-collapse')         ,       GetCSSProperty(element, 'border-collapse') != 'separate');
    SetCSSPropertyValueIf(element, 'border-spacing'      ,       GetCSSProperty(element, 'border-spacing')          ,       GetCSSProperty(element, 'border-spacing')  != '0px 0px');
    SetCSSPropertyValueIf(element, 'caption-side'        ,       GetCSSProperty(element, 'caption-side')            ,       GetCSSProperty(element, 'caption-side')    != 'top');
    SetCSSPropertyValueIf(element, 'empty-cells'         ,       GetCSSProperty(element, 'empty-cells')             ,       GetCSSProperty(element, 'empty-cells')     != 'show');
    SetCSSPropertyValueIf(element, 'table-layout'        ,       GetCSSProperty(element, 'table-layout')            ,       GetCSSProperty(element, 'table-layout')    != 'auto');
}

function updateEffect(element) {
    console.log(GetCSSProperty(element, 'border-top-left-radius'));
    SetCSSPropertyValueIf(element, 'transform'            ,       GetCSSProperty(element, 'transform')                ,      GetCSSProperty(element, 'transform')        != 'none');
    SetCSSPropertyValueIf(element, 'transition'           ,       GetCSSProperty(element, 'transition')               ,      GetCSSProperty(element, 'transition')       != 'all 0s ease 0s');
    SetCSSPropertyValueIf(element, 'outline'              ,       GetCSSProperty(element, 'outline')                  ,      GetCSSProperty(element, 'outline')          != 'none 0px');
    SetCSSPropertyValueIf(element, 'outline-offset'       ,       GetCSSProperty(element, 'outline-offset')           ,      GetCSSProperty(element, 'outline-offset')   != '0px');
    SetCSSPropertyValueIf(element, 'box-sizing'           ,       GetCSSProperty(element, 'box-sizing')               ,      GetCSSProperty(element, 'box-sizing')       != 'content-box');
    SetCSSPropertyValueIf(element, 'resize'               ,       GetCSSProperty(element, 'resize')                   ,      GetCSSProperty(element, 'resize')           != 'none');
    SetCSSPropertyValueIf(element, 'text-shadow'          ,       GetCSSProperty(element, 'text-shadow')              ,      GetCSSProperty(element, 'text-shadow')      != 'none');
    SetCSSPropertyValueIf(element, 'text-overflow'        ,       GetCSSProperty(element, 'text-overflow')            ,      GetCSSProperty(element, 'text-overflow')    != 'clip');
    SetCSSPropertyValueIf(element, 'word-wrap'            ,       GetCSSProperty(element, 'word-wrap')                ,      GetCSSProperty(element, 'word-wrap')        != 'normal');
    SetCSSPropertyValueIf(element, 'box-shadow'           ,       GetCSSProperty(element, 'box-shadow')               ,      GetCSSProperty(element, 'box-shadow')       != 'none');
    SetCSSPropertyValueIf(element, 'border-top-left-radius',      GetCSSProperty(element, 'border-top-left-radius')  ,      GetCSSProperty(element, 'border-top-left-radius') != '0px');
    SetCSSPropertyValueIf(element, 'border-top-right-radius',     GetCSSProperty(element, 'border-top-right-radius') ,      GetCSSProperty(element, 'border-top-right-radius') != '0px');
    SetCSSPropertyValueIf(element, 'border-bottom-left-radius',   GetCSSProperty(element, 'border-bottom-left-radius'),    GetCSSProperty(element, 'border-bottom-left-radius') != '0px');
    SetCSSPropertyValueIf(element, 'border-bottom-right-radius',  GetCSSProperty(element, 'border-bottom-right-radius'),   GetCSSProperty(element, 'border-bottom-right-radius') != '0px');
}



function updateMisc(element) {
    SetCSSPropertyValueIf(element, 'top',     GetCSSProperty(element, 'top') != 'auto');
    SetCSSPropertyValueIf(element, 'bottom',  GetCSSProperty(element, 'bottom') != 'auto');
    SetCSSPropertyValueIf(element, 'right',   GetCSSProperty(element, 'right') != 'auto');
    SetCSSPropertyValueIf(element, 'left',    GetCSSProperty(element, 'left') != 'auto');
    SetCSSPropertyValueIf(element, 'z-index', GetCSSProperty(element, 'z-index') != 'auto');
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

    updateTypography(element);
    updateBox(element);
    updatePositioning(element);
    updateTransforms(element);
    updateTable(element);
    updateEffect(element);
    updateMisc(element);
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
    let blockWidth = $(block).outerWidth(true);
    let blockHeight = $(block).outerWidth(true);

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



            for (let i = 0; i < VIEWER_TYPOGRAPHY.length; i++) {
                this.BuildCSSProperty(this.inspector, VIEWER_TYPOGRAPHY[i])
            }

            for (let i = 0; i < VIEWER_BOX.length; i++) {
                this.BuildCSSProperty(this.inspector, VIEWER_BOX[i])
            }

            for (let i = 0; i < VIEWER_POSITIONING.length; i++) {
                this.BuildCSSProperty(this.inspector, VIEWER_POSITIONING[i])
            }

            for (let i = 0; i < VIEWER_TRANSFORMS.length; i++) {
                this.BuildCSSProperty(this.inspector, VIEWER_TRANSFORMS[i])
            }

            for (let i = 0; i < VIEWER_TABLE.length; i++) {
                this.BuildCSSProperty(this.inspector, VIEWER_TABLE[i])
            }

            for (let i = 0; i < VIEWER_EFFECT.length; i++) {
                this.BuildCSSProperty(this.inspector, VIEWER_EFFECT[i])
            }

        }
        $('html').append(this.inspector);

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










