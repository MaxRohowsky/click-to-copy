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
    'Typography':   VIEWER_TYPOGRAPHY,
    'Box':          VIEWER_BOX,
    'Position':     VIEWER_POSITIONING
};




function GetCurrentDocument() 
{
    return window.document;
}




function ViewerMouseOver(e) 
{
    var document = GetCurrentDocument();
    var inspectorWindow = document.getElementById('CSSViewer_window');

    viewer.currentElement = this

    e.stopPropagation();

    if (this.tagName != 'body') {
        this.style.setProperty('outline', '1px dotted #f00', 'important');
    }

    var elementStyle = document.defaultView.getComputedStyle(this, null);



    var elementHTML;
    var elementAttributes;
    if (this) {
        elementAttributes = [...this.attributes];
        var elementHTML = elementAttributes.reduce((elementHTML, attribute) => {
            elementHTML[attribute.name] = attribute.value;
            return elementHTML;
        }, {});
    }

 console.log(this.attributes.getNamedItem('id'))


    SetHTMLPropertyIfv2(this, 'id',            this.attributes.getNamedItem('id') != null);
    SetHTMLPropertyIf(elementHTML, 'class',         this.attributes.getNamedItem('class') != null);
    SetHTMLPropertyIf(elementHTML, 'src',           this.attributes.getNamedItem('src') != null);
    SetHTMLPropertyIf(elementHTML, 'href',          this.attributes.getNamedItem('href') != null);
    SetHTMLPropertyIf(elementHTML, 'alt',           this.attributes.getNamedItem('alt') != null);
    SetHTMLPropertyIf(elementHTML, 'placeholder',   this.attributes.getNamedItem('placeholder') != null);
    SetHTMLPropertyIf(elementHTML, 'width',         this.attributes.getNamedItem('width') != null);

    SetCSSPropertyIf(elementStyle, 'font-size',     true);
    SetCSSPropertyIf(elementStyle, 'font-weight',   GetCSSProperty(elementStyle, 'font-weight') != '400');
    SetCSSPropertyIf(elementStyle, 'font-style',    GetCSSProperty(elementStyle, 'font-style') != 'normal');
    SetCSSPropertyIf(elementStyle, 'color',         true);
    SetCSSPropertyIf(elementStyle, 'font-family',   true);

    SetCSSPropertyIf(elementStyle, 'height',        GetCSSProperty(elementStyle, 'height')      != 'auto');
    SetCSSPropertyIf(elementStyle, 'width',         GetCSSProperty(elementStyle, 'width')      != 'auto');
    SetCSSPropertyIf(elementStyle, 'border',        true);
    SetCSSPropertyIf(elementStyle, 'border-top',    true);
    SetCSSPropertyIf(elementStyle, 'border-right',  true);

    SetCSSPropertyIf(elementStyle, 'top',           GetCSSProperty(elementStyle, 'top')      != 'auto');
    SetCSSPropertyIf(elementStyle, 'bottom',        GetCSSProperty(elementStyle, 'bottom')   != 'auto');
    SetCSSPropertyIf(elementStyle, 'right',         GetCSSProperty(elementStyle, 'right')    != 'auto');
    SetCSSPropertyIf(elementStyle, 'left',          GetCSSProperty(elementStyle, 'left')     != 'auto');
    SetCSSPropertyIf(elementStyle, 'z-index',       GetCSSProperty(elementStyle, 'z-index')  != 'auto');





    function getImages(el, includeDuplicates = false) {
        const images = [...el.getElementsByTagName('img')].map(img =>
            img.getAttribute('src')
        );
        return includeDuplicates ? images : [...new Set(images)];
    }




    var assets = getImages(this);

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
class Viewer {
    constructor() {
        this.haveEventListeners = false;
        this.currentElement = null;
    }



    // Test on here: JavaScript - Get all images in element - 30 seconds of code https://www.30secondsofcode.org/js/s/get-images/#:~:text=Fetches%20all%20images%20from%20within,elements%20inside%20the%20provided%20element.
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

    
    BuildHTMLAttribute = function (container, attribute) {
        var p = document.createElement('p');
        p.id = 'InspectorWindow_' + attribute;

        var spanName = document.createElement('span');
        spanName.className = 'InspectorWindow_attribute';

        var spanValue = document.createElement('span');
        spanValue.className = 'InspectorWindow_htmlvalue';
        spanValue.contentEditable = true;

        p.appendChild(spanName);
        p.appendChild(spanValue);

        container.appendChild(p);
    }


    BuildCSSProperty = function (container, property) {
        var p = document.createElement('p');
        p.id = 'InspectorWindow_' + property;

        var spanName = document.createElement('span');
        spanName.className = 'InspectorWindow_property';

        var spanValue = document.createElement('span');
        spanValue.className = 'InspectorWindow_cssvalue';
        spanValue.contentEditable = true;

        p.appendChild(spanName);
        p.appendChild(spanValue);

        container.appendChild(p);
    }


    BuildInspectorWindow = function () {
        var document = GetCurrentDocument();
        var container;

        if (document) {

            container = document.createElement('div');
            container.id = 'InspectorWindow_container';


            var title = document.createElement('p');
            title.appendChild(document.createTextNode('HTML'));
            container.appendChild(title);

            for (var i = 0; i < VIEWER_HTML.length; i++) {
                this.BuildHTMLAttribute(container, VIEWER_HTML[i])
            }





            //-----------------------------------------------

            var title = document.createElement('p');
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
            container.appendChild(title);

            //-----------------------------------------------

            var assets = document.createElement('div');
            assets.id = 'InspectorWindow_assets';

            container.appendChild(assets)

            //var img = document.createElement('img');
            //img.id = 'InspectorWindow_asset';
            //img.width = 50;
            //img.height = 50;

            //container.appendChild(img);














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

        for (var i = 0; i < VIEWER_HTML.length; i++) {
            (function (index) {
                $('#InspectorWindow_' + VIEWER_HTML[index] + ' .InspectorWindow_value').on("input", () => {
                    UpdateHTMLValue($('#InspectorWindow_' + VIEWER_HTML[index] + ' .InspectorWindow_value'), VIEWER_HTML[index]);
                });
            })(i);
        }


        $('#InspectorWindow_font-size .InspectorWindow_value').on("input", () => UpdateValue($('#InspectorWindow_font-size .InspectorWindow_value'), 'font-size'))
        $('#InspectorWindow_font-weight .InspectorWindow_value').on("input", () => UpdateValue($('#InspectorWindow_font-weight  .InspectorWindow_value'), 'font-weight'))
        $('#InspectorWindow_font-style .InspectorWindow_value').on("input", () => UpdateValue($('#InspectorWindow_font-style .InspectorWindow_value'), 'font-style'))
        $('#InspectorWindow_color .InspectorWindow_value').on("input", () => UpdateValue($('#InspectorWindow_color .InspectorWindow_value'), 'color'))

    }

    RemoveEditEventListeners = function () {
        $('#InspectorWindow_font-size .InspectorWindow_value').off("input")
        $('#InspectorWindow_font-weight .InspectorWindow_value').off("input")
        $('#InspectorWindow_font-style .InspectorWindow_value').off("input")
        $('#InspectorWindow_color .InspectorWindow_value').off("input")

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



