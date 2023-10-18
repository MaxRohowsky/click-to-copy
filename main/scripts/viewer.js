


var VIEWER_ELEMENT

var VIEWER_HTML = new Array(
    'class',
    'id',
    'src',
    'href',
    'alt',
    'width',
    'height',
    'placeholder',
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




function GetCurrentDocument() {
    return window.document;
}



function UpdateValue(inputElement, property) {

    // viewer.currentElement.style.fontSize = x.html();
    viewer.currentElement.style[property] = inputElement.html();
}




function GetCSSProperty(elementStyle, property) {
    return elementStyle.getPropertyValue(property)
}

function GetHTMLAttribute(elementHTML, property) {
    if (elementHTML[property]) {
        return elementHTML[property]
    }

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
        //this.style.outline = '1px dotted #f00';
        this.style.setProperty('outline', '1px dotted #f00', 'important');
    }



    // Get info:
    var elementStyle = document.defaultView.getComputedStyle(this, null);

    // Get info:

    //var node = document.querySelector('#anotherdiv') https://javascript.plainenglish.io/how-to-get-all-attributes-of-an-element-using-javascript-or-jquery-28f362b55ba5#:~:text=Conclusion-,We%20can%20get%20all%20attributes%20of%20an%20element%20with%20JavaScript,the%20value%20of%20the%20property.

    var elementHTML;
    if (this) {
        var attributeNodeArray = [...this.attributes];
        var elementHTML = attributeNodeArray.reduce((elementHTML, attribute) => {
            elementHTML[attribute.name] = attribute.value;
            return elementHTML;
        }, {});

    }


    //console.log(GetHTMLAttribute(elementHTML, VIEWER_HTML[0]))

    console.log(document.elementsFromPoint(e.clientX, e.clientY));






    // Get info for property:

    //placeholder
    $('#ViewerWindow_placeholder .ViewerWindow_property').text(VIEWER_HTML[0] + ": ");
    $('#ViewerWindow_placeholder .ViewerWindow_value').text(GetHTMLAttribute(elementHTML, VIEWER_HTML[0]));


    //size
    $('#ViewerWindow_font-size .ViewerWindow_property').text(VIEWER_TYPOGRAPHY[0] + ": ");
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







    function getImages(el, includeDuplicates = false) {
        const images = [...el.getElementsByTagName('img')].map(img =>
            img.getAttribute('src')
        );
        return includeDuplicates ? images : [...new Set(images)];
    }


    console.log(getImages(this))
    var assets = getImages(this);



    for (var i = 0; i < assets.length; i++) {
        if(assets[i]!=null){
        var img = document.createElement('img');
        img.id = 'ViewerWindow_asset';
        img.src = assets[i];
        img.width = 50;
        img.height = 50;
        $('#ViewerWindow_assets').append(img);
    }
    //$('#ViewerWindow_asset').attr('src', assets[i]);
    }

    










}

/*
* Triggered when mouse moves within element boundaries
*/
function ViewerMouseOut(e) 
{  
    $('#ViewerWindow_assets').empty();
    
    
    this.style.outline = '';
    e.stopPropagation();



}

/*
* Triggered when mouse moves within element boundaries
*/
function ViewerMouseMove(e) 
{


    var document = GetCurrentDocument();
    var block = document.getElementById('ViewerWindow_container');
    var pageWidth = window.innerWidth;
    var pageHeight = window.innerHeight;
    var blockWidth = document.defaultView.getComputedStyle(block, null).getPropertyValue('width');
    var blockHeight = document.defaultView.getComputedStyle(block, null).getPropertyValue('height');

    var xOffset = 20;
    var yOffset = 20;

    block.style.position = 'absolute';





    // Set X position of ViewerWindow
    if ((e.clientX + parseFloat(blockWidth) + xOffset) > parseFloat(pageWidth)) {
        //console.log('true')
        if ((e.clientX - parseFloat(blockWidth) - xOffset) > 0)
            block.style.left = e.clientX - parseFloat(blockWidth) - xOffset + 'px';
        else
            block.style.left = 0 + 'px';
    }
    else
        block.style.left = (e.pageX + xOffset) + 'px';

    // Set Y position of ViewerWindow
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
        //console.log(elements)
        return elements;
    }


    BuildViewerWindow = function () {
        var document = GetCurrentDocument();
        var container;

        if (document) {

            container = document.createElement('div');
            container.id = 'ViewerWindow_container';





            var title = document.createElement('p');
            title.appendChild(document.createTextNode('HTML'));
            container.appendChild(title);

            //-----------------------------------------------

            var p = document.createElement('p');
            p.id = 'ViewerWindow_placeholder';

            var spanName = document.createElement('span');
            spanName.className = 'ViewerWindow_property';

            var spanValue = document.createElement('span');
            spanValue.className = 'ViewerWindow_value';
            spanValue.contentEditable = true;

            p.appendChild(spanName);
            p.appendChild(spanValue);

            container.appendChild(p);
















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





            //---------------------------------------------
            var title = document.createElement('p');
            title.appendChild(document.createTextNode('Assets'));
            container.appendChild(title);

            //-----------------------------------------------

            var assets = document.createElement('div');
            assets.id = 'ViewerWindow_assets';

            container.appendChild(assets)

            //var img = document.createElement('img');
            //img.id = 'ViewerWindow_asset';
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
        var viewerWindow = document.getElementById('ViewerWindow_container');

        // If ViewerWindow not injected, inject!

            if (!viewerWindow) {
                var viewerWindow = viewer.BuildViewerWindow();
                document.body.appendChild(viewerWindow);
                viewer.AddEventListeners();

            }
        

    });
});









document.onkeydown = Viewer_Keypress;



