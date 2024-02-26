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
    'font-weight',                      // default: 400
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



function GetCurrentDocument() {
    return window.document;
}


function ViewerMouseOver(e) {
    let element = this;
    viewer.currentElement = element;
    viewer.nrAttributes = 0;

    e.stopPropagation();

    if (this.tagName != 'body') {
        this.style.setProperty('outline', '1px dotted #f00', 'important');
    }

    SetHTMLAttributes(element);
    SetCSSProperties(element);
    SetAssets(element);

}

/*
* Triggered when mouse moves within element boundaries
*/
function ViewerMouseOut(e) {
    $('#InspectorWindow_assets').empty();
    $('#InspectorWindow_value').empty();

    this.style.outline = '';
    e.stopPropagation();

}

/*
* Triggered when mouse moves within element boundaries
*/
function ViewerMouseMove(e) {


    let document = GetCurrentDocument();
    let block = document.getElementById('InspectorWindow_container');
    let pageWidth = window.innerWidth;
    let pageHeight = window.innerHeight;
    let blockWidth = document.defaultView.getComputedStyle(block, null).getPropertyValue('width');
    let blockHeight = document.defaultView.getComputedStyle(block, null).getPropertyValue('height');

    let xOffset = 20;
    let yOffset = 20;

    block.style.position = 'absolute';


    // Set X position of InspectorWindow
    if ((e.clientX + parseFloat(blockWidth) + xOffset) > parseFloat(pageWidth)) {
        //console.log('true')
        if ((e.clientX - parseFloat(blockWidth) - xOffset) > 0)
            block.style.left = e.clientX - parseFloat(blockWidth) - xOffset + 'px';
        else
            block.style.left = 0 + 'px';
    }
    else
        block.style.left = (e.pageX + xOffset) + 'px';

    // Set Y position of InspectorWindow
    if ((e.clientY + parseFloat(blockHeight) + yOffset) > parseFloat(pageHeight)) {
        if ((e.clientY - parseFloat(blockHeight) - yOffset) > 0)
            block.style.top = e.pageY - parseFloat(blockHeight) - yOffset + 'px';
        else
            block.style.top = 0 + 'px';
    }
    else
        block.style.top = (e.pageY + yOffset) + 'px';



    e.stopPropagation();


}



/*
* Viewer Class
*/
class Viewer {
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


    BuildHTMLAttribute = function (container, attribute) {
        let p = document.createElement('p');
        p.id = 'InspectorWindow_' + attribute;

        let spanName = document.createElement('span');
        spanName.className = 'InspectorWindow_attribute';

        let spanValue = document.createElement('span');
        spanValue.className = 'InspectorWindow_htmlValue';
        spanValue.contentEditable = true;

        p.appendChild(spanName);
        p.appendChild(spanValue);

        container.appendChild(p);
    }


    BuildCSSProperty = function (container, property) {
        let p = document.createElement('p');
        p.id = 'InspectorWindow_' + property;

        let spanName = document.createElement('span');
        spanName.className = 'InspectorWindow_property';

        let spanValue = document.createElement('span');
        spanValue.className = 'InspectorWindow_cssValue';
        spanValue.contentEditable = true;

        p.appendChild(spanName);
        p.appendChild(spanValue);

        container.appendChild(p);
    }


    BuildInspectorWindow = function () {
        let document = GetCurrentDocument();
        let container;

        if (document) {

            container = document.createElement('div');
            container.id = 'InspectorWindow_container';

            let title = document.createElement('p');
            title.id = 'InspectorWindow_htmlTitle';
            title.appendChild(document.createTextNode('HTML'));
            container.appendChild(title);

            for (let i = 0; i < VIEWER_HTML.length; i++) {
                this.BuildHTMLAttribute(container, VIEWER_HTML[i])
            }

            //-----------------------------------------------

            let title2 = document.createElement('p');
            title2.id = 'InspectorWindow_cssTitle';
            title2.appendChild(document.createTextNode('CSS'));
            container.appendChild(title2);

            for (let i = 0; i < VIEWER_TYPOGRAPHY.length; i++) {
                this.BuildCSSProperty(container, VIEWER_TYPOGRAPHY[i])
            }

            for (let i = 0; i < VIEWER_BOX.length; i++) {
                this.BuildCSSProperty(container, VIEWER_BOX[i])
            }

            for (let i = 0; i < VIEWER_POSITIONING.length; i++) {
                this.BuildCSSProperty(container, VIEWER_POSITIONING[i])
            }

            //---------------------------------------------
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

    AddEventListeners = function () {
        let document = GetCurrentDocument();
        let elements = this.GetAllElements(document.body);


        for (let i = 0; i < elements.length; i++) {
            $(elements[i]).on("mouseover", ViewerMouseOver);
            $(elements[i]).on("mouseout", ViewerMouseOut);
            $(elements[i]).on("mousemove", ViewerMouseMove);
        }
        this.haveEventListeners = true;
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


    AddEditEventListeners = function () {
        for (let i = 0; i < VIEWER_HTML.length; i++) {
            (function (index) {
                $('#InspectorWindow_' + VIEWER_HTML[index] + ' .InspectorWindow_htmlValue').on("input", () => {
                    UpdateHTMLValue($('#InspectorWindow_' + VIEWER_HTML[index] + ' .InspectorWindow_htmlValue'), VIEWER_HTML[index]);
                });
            })(i);
        }



        let categoryKeys = Object.keys(VIEWER_CATEGORIES);

        for (let i = 0; i < Object.keys(VIEWER_CATEGORIES).length; i++) {
            let cat = VIEWER_CATEGORIES[categoryKeys[i]];
            for (let j = 0; j < cat.length; j++) {
                AddEditEventListenersCSS(cat[j])
            }
        }


    }

    RemoveEditEventListeners = function () {
        for (let i = 0; i < VIEWER_HTML.length; i++) {
            $('#InspectorWindow_' + VIEWER_HTML[i] + ' .InspectorWindow_htmlValue').off("input");
        }

        for (let i = 0; i < VIEWER_TYPOGRAPHY.length; i++) {
            $('#InspectorWindow_' + VIEWER_TYPOGRAPHY[i] + ' .InspectorWindow_htmlValue').off("input");
        }

        for (let i = 0; i < VIEWER_BOX.length; i++) {
            $('#InspectorWindow_' + VIEWER_BOX[i] + ' .InspectorWindow_htmlValue').off("input");
        }

        for (let i = 0; i < VIEWER_POSITIONING.length; i++) {
            $('#InspectorWindow_' + VIEWER_POSITIONING[i] + ' .InspectorWindow_htmlValue').off("input");
        }

    }




    Freeze = function () {
        this.RemoveEventListeners();
        this.AddEditEventListeners();

        $("#InspectorWindow_container").css("background-color", "rgba(46, 52, 64, 1)");
        $("#InspectorWindow_container").css("box-shadow", "0px 0px 10px rgba(0, 0, 0, 0.0)");

        let svgx = '<svg id="xSymbol" fill="#ffffff" height="10px" width="10px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 460.775 460.775" xml:space="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"></path> </g></svg>';
        let $svg = $(svgx);
        $svg.on('click', function () {
            $("#InspectorWindow_container").remove();;
        });
        $("#InspectorWindow_container").append($svg);




    }

    Unfreeze = function () {
        this.AddEventListeners();
        this.RemoveEditEventListeners();
        $("#InspectorWindow_container").css("background-color", "rgba(46, 52, 64, 0.9)");
        $("#InspectorWindow_container").css("box-shadow", "0px 0px 10px rgba(0, 0, 0, 0.15)");

    }



    isEnabled = function () {
        let document = GetCurrentDocument();

        if (document.getElementById('InspectorWindow_container')) {
            return true;
        }
        return false;

    }


    close(){
        console.log('closing viewer');
    }

    


}




function Viewer_Keypress(e) {
    // f: Freeze or Unfreeze the css viewer if the cssViewer is enabled
    if (e.key === 'f' && viewer) {
        if (viewer.haveEventListeners) {
            viewer.Freeze();
        }
        else {
            viewer.Unfreeze();
        }
    }
}







