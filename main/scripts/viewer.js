


var VIEWER_ELEMENT

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




function GetCurrentDocument() {
    return window.document;
}



function UpdateValue(inputElement, property) 
{
    //console.log(x.html());
    console.log(viewer.currentElement.style);
   // viewer.currentElement.style.fontSize = x.html();
   viewer.currentElement.style[property] = inputElement.html();
}




function GetCSSProperty(elementStyle, property) 
{
    return elementStyle.getPropertyValue(property)
}





function ViewerMouseOver(e) {
    var document = GetCurrentDocument();
    var viewerWindow = document.getElementById('CSSViewer_window');

    // Save element to viewer instance
    viewer.currentElement = this

    // Stop event propagation through DOM
    e.stopPropagation();

    // Outline element
    if (this.tagName != 'body') {
        this.style.outline = '1px dotted #f00';
    }

    // Get info:
    var elementStyle = document.defaultView.getComputedStyle(this, null);

    // Get info for property:




    //size
    $('#ViewerWindow_font-size .ViewerWindow_property').text(VIEWER_TYPOGRAPHY[0]+ ": ");
    $('#ViewerWindow_font-size .ViewerWindow_value').text(GetCSSProperty(elementStyle, VIEWER_TYPOGRAPHY[0]));

    //weight
    $('#ViewerWindow_font-weight .ViewerWindow_property').text(VIEWER_TYPOGRAPHY[1] + ": ");
    $('#ViewerWindow_font-weight .ViewerWindow_value').text(GetCSSProperty(elementStyle, VIEWER_TYPOGRAPHY[1]));

    //style
    $('#ViewerWindow_font-style .ViewerWindow_property').text(VIEWER_TYPOGRAPHY[2] + ": ");
    $('#ViewerWindow_font-style .ViewerWindow_value').text(GetCSSProperty(elementStyle, VIEWER_TYPOGRAPHY[2]));

    //color
    $('#ViewerWindow_color .ViewerWindow_property').text(VIEWER_TYPOGRAPHY[3] + ": ");
    $('#ViewerWindow_color .ViewerWindow_value').text(GetCSSProperty(elementStyle, VIEWER_TYPOGRAPHY[3]));






}

/*
* Triggered when mouse moves within element boundaries
*/
function ViewerMouseOut(e) {
    this.style.outline = '';
    e.stopPropagation();



}

/*
* Triggered when mouse moves within element boundaries
*/
function ViewerMouseMove(e) {


    var document = GetCurrentDocument();
    var block = document.getElementById('ViewerWindow_container');

    block.style.position = 'absolute';

    //var blockWidth = 332;
    //var blockHeight = 100;

    block.style.left = e.pageX + 'px';;
    block.style.top = e.pageY + 20 + 'px';


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


    logToConsole() {
        console.log(this.locked);
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


    BuildViewerWindow = function () {
        var document = GetCurrentDocument();
        var container;

        if (document) {

            container = document.createElement('div');
            container.id = 'ViewerWindow_container';


            var title = document.createElement('p');
            title.appendChild(document.createTextNode('CSS'));
            container.appendChild(title);

            //-----------------------------------------------

            var p = document.createElement('p');
            p.id = 'ViewerWindow_font-size';

            var spanName = document.createElement('span');
            spanName.className = 'ViewerWindow_property';

            var spanValue = document.createElement('span');
            spanValue.className = 'ViewerWindow_value';
            spanValue.contentEditable = true;

            p.appendChild(spanName);
            p.appendChild(spanValue);

            container.appendChild(p);


            //-----------------------------

            var p = document.createElement('p');
            p.id = 'ViewerWindow_font-weight';

            var spanName = document.createElement('span');
            spanName.className = 'ViewerWindow_property';

            var spanValue = document.createElement('span');
            spanValue.className = 'ViewerWindow_value';
            spanValue.contentEditable = true;

            p.appendChild(spanName);
            p.appendChild(spanValue);

            container.appendChild(p);

            //-----------------------------

            var p = document.createElement('p');
            p.id = 'ViewerWindow_font-style';

            var spanName = document.createElement('span');
            spanName.className = 'ViewerWindow_property';

            var spanValue = document.createElement('span');
            spanValue.className = 'ViewerWindow_value';
            spanValue.contentEditable = true;

            p.appendChild(spanName);
            p.appendChild(spanValue);

            container.appendChild(p);


            //-----------------------------

            var p = document.createElement('p');
            p.id = 'ViewerWindow_color';

            var spanName = document.createElement('span');
            spanName.className = 'ViewerWindow_property';

            var spanValue = document.createElement('span');
            spanValue.className = 'ViewerWindow_value';
            spanValue.contentEditable = true;

            p.appendChild(spanName);
            p.appendChild(spanValue);

            container.appendChild(p);



        }

        return container;
    }


    // Add event listeners for all elements in the current document
    AddEventListeners = function () {
        var document = GetCurrentDocument();
        var elements = this.GetAllElements(document.body);

        for (var i = 0; i < elements.length; i++) {
            //ViewerMouseOver is executed when mouseover event is triggered
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
        $('#ViewerWindow_font-size .ViewerWindow_value').on("input", () => UpdateValue($('#ViewerWindow_font-size .ViewerWindow_value'), 'font-size'))

        $('#ViewerWindow_font-weight .ViewerWindow_value').on("input", () => UpdateValue($('#ViewerWindow_font-weight  .ViewerWindow_value'), 'font-weight'))
        $('#ViewerWindow_font-style .ViewerWindow_value').on("input", () => UpdateValue($('#ViewerWindow_font-style .ViewerWindow_value'), 'font-style'))
        $('#ViewerWindow_color .ViewerWindow_value').on("input", () => UpdateValue($('#ViewerWindow_color .ViewerWindow_value'), 'color'))

    }

    RemoveEditEventListeners = function () {
        $('#ViewerWindow_font-size .ViewerWindow_value').off("input")

        $('#ViewerWindow_font-weight .ViewerWindow_value').off("input")
        $('#ViewerWindow_font-style .ViewerWindow_value').off("input")
        $('#ViewerWindow_color .ViewerWindow_value').off("input")

    }




    Freeze = function () {
        if (this.haveEventListeners) {
            this.RemoveEventListeners();

            this.AddEditEventListeners();


            return true;
        }
        return false;
    }

    Unfreeze = function () {

        if (!this.haveEventListeners) {
            this.AddEventListeners();

            this.RemoveEditEventListeners();

            return true;
        }
        return false;
    }



    isEnabled = function () {
        var document = GetCurrentDocument();

        if (document.getElementById('ViewerWindow_container')) {
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



// Viewer Instance 
const viewer = new Viewer()

// Check if VeiwerWindow injected
var document = GetCurrentDocument()
var viewerWindow = document.getElementById('ViewerWindow_container');

// If ViewerWindow not injected, inject!
if (!viewerWindow) {
    var viewerWindow = viewer.BuildViewerWindow();
    document.body.appendChild(viewerWindow);
    viewer.AddEventListeners();
}






document.onkeydown = Viewer_Keypress;



