var VIEWER_ELEMENT

var VIEWER_HTML = new Array(
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
    'value'
);


var VIEWER_TYPOGRAPHY = new Array(
    'font-size',
    'font-weight',                      // default: 400
    'font-style',
    'color',
    'font-family'
);

var VIEWER_BOX = new Array(
    'height',
    'width',
    'border',
    'border-top',
    'border-right',
    'border-bottom',
    'border-left',
    'margin',
    'padding',
);

var VIEWER_POSITIONING = new Array(
    'top',
    'bottom',
    'right',
    'left',
    'z-index'
);


var VIEWER_CATEGORIES = {
    'Typography': VIEWER_TYPOGRAPHY,
    'Box': VIEWER_BOX,
    'Position': VIEWER_POSITIONING
};




function GetCurrentDocument() 
{
    return window.document;
}


function ViewerMouseOver(e) 
{
    var element = this;
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


    var document = GetCurrentDocument();
    var block = document.getElementById('InspectorWindow_container');
    var pageWidth = window.innerWidth;
    var pageHeight = window.innerHeight;
    var blockWidth = document.defaultView.getComputedStyle(block, null).getPropertyValue('width');
    var blockHeight = document.defaultView.getComputedStyle(block, null).getPropertyValue('height');

    var xOffset = 20;
    var yOffset = 20;

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
class Viewer 
{
    constructor() {
        this.haveEventListeners = false;
        this.currentElement = null;
    }


    GetAllElements = function (element) {
        var elements = new Array();

        if (element && element.hasChildNodes()) {
            elements.push(element);

            var childs = element.childNodes;

            for (var i = 0; i < childs.length; i++) {
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


    BuildHTMLAttribute = function (container, attribute) 
    {
        var p = document.createElement('p');
        p.id = 'InspectorWindow_' + attribute;

        var spanName = document.createElement('span');
        spanName.className = 'InspectorWindow_attribute';

        var spanValue = document.createElement('span');
        spanValue.className = 'InspectorWindow_htmlValue';
        spanValue.contentEditable = true;

        p.appendChild(spanName);
        p.appendChild(spanValue);

        container.appendChild(p);
    }


    BuildCSSProperty = function (container, property) 
    {
        var p = document.createElement('p');
        p.id = 'InspectorWindow_' + property;

        var spanName = document.createElement('span');
        spanName.className = 'InspectorWindow_property';

        var spanValue = document.createElement('span');
        spanValue.className = 'InspectorWindow_cssValue';
        spanValue.contentEditable = true;

        p.appendChild(spanName);
        p.appendChild(spanValue);

        container.appendChild(p);
    }


    BuildInspectorWindow = function () 
    {
        var document = GetCurrentDocument();
        var container;

        if (document) {

            container = document.createElement('div');
            container.id = 'InspectorWindow_container';

            var title = document.createElement('p');
            title.id = 'InspectorWindow_htmlTitle';
            title.appendChild(document.createTextNode('HTML'));
            container.appendChild(title);

            for (var i = 0; i < VIEWER_HTML.length; i++) {
                this.BuildHTMLAttribute(container, VIEWER_HTML[i])
            }

            //-----------------------------------------------

            var title = document.createElement('p');
            title.id = 'InspectorWindow_cssTitle';
            title.appendChild(document.createTextNode('CSS'));
            container.appendChild(title);

            for (var i = 0; i < VIEWER_TYPOGRAPHY.length; i++) {
                this.BuildCSSProperty(container, VIEWER_TYPOGRAPHY[i])
            }

            for (var i = 0; i < VIEWER_BOX.length; i++) {
                this.BuildCSSProperty(container, VIEWER_BOX[i])
            }

            for (var i = 0; i < VIEWER_POSITIONING.length; i++) {
                this.BuildCSSProperty(container, VIEWER_POSITIONING[i])
            }

            //---------------------------------------------
            var title = document.createElement('p');
            title.appendChild(document.createTextNode('Assets'));
            title.id = 'InspectorWindow_assetsTitle';
            container.appendChild(title);

            var assets = document.createElement('div');
            assets.id = 'InspectorWindow_assets';

            container.appendChild(assets)

        }

        return container;
    }

    AddEventListeners = function () {
        var document = GetCurrentDocument();
        var elements = this.GetAllElements(document.body);


        for (var i = 0; i < elements.length; i++) {
            $(elements[i]).on("mouseover", ViewerMouseOver);
            $(elements[i]).on("mouseout", ViewerMouseOut);
            $(elements[i]).on("mousemove", ViewerMouseMove);
        }
        this.haveEventListeners = true;
    }


    RemoveEventListeners = function () {
        var document = GetCurrentDocument();
        var elements = this.GetAllElements(document.body);

        for (var i = 0; i < elements.length; i++) {
            $(elements[i]).off("mouseover", ViewerMouseOver);
            $(elements[i]).off("mouseout", ViewerMouseOut);
            $(elements[i]).off("mousemove", ViewerMouseMove);
        }
        this.haveEventListeners = false;
    }


    AddEditEventListeners = function () {
        for (var i = 0; i < VIEWER_HTML.length; i++) {
            (function (index) {
                $('#InspectorWindow_' + VIEWER_HTML[index] + ' .InspectorWindow_htmlValue').on("input", () => {
                    UpdateHTMLValue($('#InspectorWindow_' + VIEWER_HTML[index] + ' .InspectorWindow_htmlValue'), VIEWER_HTML[index]);
                });
            })(i);
        }



        var categoryKeys = Object.keys(VIEWER_CATEGORIES);

        for (var i = 0; i < Object.keys(VIEWER_CATEGORIES).length; i++){
            var cat = VIEWER_CATEGORIES[categoryKeys[i]];
            for (var j = 0; j < cat.length; j++) {
                AddEditEventListenersCSS(cat[j])
             }
        }




        /*

        for (var i = 0; i < VIEWER_TYPOGRAPHY.length; i++) {
            (function (index) {
                $('#InspectorWindow_' + VIEWER_TYPOGRAPHY[index] + ' .InspectorWindow_cssValue').on("input", () => {
                    UpdateCSSValue($('#InspectorWindow_' + VIEWER_TYPOGRAPHY[index] + ' .InspectorWindow_cssValue'), VIEWER_TYPOGRAPHY[index]);
                });
            })(i);
        }

        for (var i = 0; i < VIEWER_BOX.length; i++) {
            (function (index) {
                $('#InspectorWindow_' + VIEWER_BOX[index] + ' .InspectorWindow_cssValue').on("input", () => {
                    UpdateCSSValue($('#InspectorWindow_' + VIEWER_BOX[index] + ' .InspectorWindow_cssValue'), VIEWER_BOX[index]);
                });
            })(i);
        }

        for (var i = 0; i < VIEWER_POSITIONING.length; i++) {
            (function (index) {
                $('#InspectorWindow_' + VIEWER_POSITIONING[index] + ' .InspectorWindow_cssValue').on("input", () => {
                    UpdateCSSValue($('#InspectorWindow_' + VIEWER_POSITIONING[index] + ' .InspectorWindow_cssValue'), VIEWER_POSITIONING[index]);
                });
            })(i);
        }*/
    }

    RemoveEditEventListeners = function () {
        for (var i = 0; i < VIEWER_HTML.length; i++) {
            $('#InspectorWindow_' + VIEWER_HTML[i] + ' .InspectorWindow_htmlValue').off("input");
        }

        for (var i = 0; i < VIEWER_TYPOGRAPHY.length; i++) {
            $('#InspectorWindow_' + VIEWER_TYPOGRAPHY[i] + ' .InspectorWindow_htmlValue').off("input");
        }

        for (var i = 0; i < VIEWER_BOX.length; i++) {
            $('#InspectorWindow_' + VIEWER_BOX[i] + ' .InspectorWindow_htmlValue').off("input");
        }

        for (var i = 0; i < VIEWER_POSITIONING.length; i++) {
            $('#InspectorWindow_' + VIEWER_POSITIONING[i] + ' .InspectorWindow_htmlValue').off("input");
        }

    }




    Freeze = function () {
            this.RemoveEventListeners();
            this.AddEditEventListeners();
            $("#InspectorWindow_container").css("background-color", "rgba(46, 52, 64, 1)");
            $("#InspectorWindow_container").css("box-shadow", "0px 0px 10px rgba(0, 0, 0, 0.0)");


    }

    Unfreeze = function () {
            this.AddEventListeners();
            this.RemoveEditEventListeners();
            $("#InspectorWindow_container").css("background-color", "rgba(46, 52, 64, 0.9)");
            $("#InspectorWindow_container").css("box-shadow", "0px 0px 10px rgba(0, 0, 0, 0.15)");

    }



    isEnabled = function () {
        var document = GetCurrentDocument();

        if (document.getElementById('InspectorWindow_container')) {
            return true;
        }
        return false;

    }


}




function Viewer_Keypress(e) {
    // f: Freeze or Unfreeze the css viewer if the cssViewer is enabled
    if (e.key === 'f') {
        if (viewer.haveEventListeners) {
            viewer.Freeze();
        }
        else {
            viewer.Unfreeze();
        }
    }
}

var viewer;

$(function () {
    // Create a new button element
    var newButton = $('<button>Start</button>');

    // Add some CSS styles to position it in the top right corner
    newButton.css({
        position: 'fixed',
        top: '10px',
        right: '10px',
        'z-index': '9999'
    });

    // Add the button to the body of the document
    $('body').append(newButton);

    // Add a click event handler to the button
    newButton.on("click", function () {

        // Viewer Instance 
        viewer = new Viewer();

        // Check if VeiwerWindow injected
        var document = GetCurrentDocument();
        var inspectorWindow = document.getElementById('InspectorWindow_container');

        // If InspectorWindow not injected, inject!

        if (!inspectorWindow) {
            var inspectorWindow = viewer.BuildInspectorWindow();
            document.body.appendChild(inspectorWindow);
            viewer.AddEventListeners();

        }


    });
});









document.onkeydown = Viewer_Keypress;



