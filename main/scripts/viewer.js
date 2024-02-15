const TYPOGRAPHY = {
    'font-size': '',
    'font-weight': '400',
    'font-style': 'normal',
    'font-family': '',
    'color': '#000000',
    'letter-spacing': 'normal',
    'line-height': 'normal',
    'text-decoration': 'none',
    'text-align': 'start',
    'text-indent': '0px',
    'text-transform': 'none',
    'vertical-align': 'baseline',
    'white-space': 'normal',
    'word-spacing': '0px'
};


const BOX = {
    'width': 'auto',
    'height': 'auto',

    'border': '0px none rgb(0, 0, 0)',
    /*'border-top': '0px none rgb(0, 0, 0)',
    'border-right': '0px none rgb(0, 0, 0)',
    'border-bottom': '0px none rgb(0, 0, 0)',
    'border-left': '0px none rgb(0, 0, 0)',*/

    'padding': '0px',
    /*'padding-top': '0px',
    'padding-right': '0px',
    'padding-bottom': '0px',
    'padding-left': '0px',*/

    'margin': '0px',
    /*'margin-top': '0px',
    'margin-right': '0px',
    'margin-bottom': '0px',
    'margin-left': '0px',*/

    'max-height': 'none',
    'min-height': '0px',
    'max-width': 'none',
    'min-width': '0px'
};


const POSITIONING = {
    'position': 'static',
    'top': 'auto',
    'right': 'auto',
    'bottom': 'auto',
    'left': 'auto',
    'float': 'none',
    'display': 'block',
    'clear': 'none',
    'z-index': 'auto'
};


const TRANSFORMS = {
    'transform': 'none',
    'translate': 'none',
    'rotate': 'none',
    'scale': 'none',
    'skew': ''
};


const TABLE = {
    'border-collapse': 'separate',
    'border-spacing': '0px 0px',
    'caption-side': 'top',
    'empty-cells': 'show',
    'table-layout': 'auto'
};


const EFFECT = {
    'transform': 'none',
    'transition': 'all 0s ease 0s',
    'outline': 'rgb(0, 0, 0) none 0px',
    'outline-offset': '0px',
    'box-sizing': 'content-box',
    'resize': 'none',
    'text-shadow': 'none',
    'text-overflow': 'clip',
    'word-wrap': 'normal',
    'box-shadow': 'none',

    'border-radius': '0px',
    /*'border-top-left-radius': '0px',
    'border-top-right-radius': '0px',
    'border-bottom-left-radius': '0px',
    'border-bottom-right-radius': '0px'*/
};


/*
let CATEGORIES = {
    'Typography': VIEWER_TYPOGRAPHY,
    'Box': VIEWER_BOX,
    'Position': VIEWER_POSITIONING,
    'Transforms': VIEWER_TRANSFORMS,
    'Table': VIEWER_TABLE,
    'Effect': VIEWER_EFFECT
};
*/




function getCSSProperty(element, property) {
    var elementStyle = document.defaultView.getComputedStyle(element, null);
    return elementStyle.getPropertyValue(property)
}


function rgbToHex(rgb) {
    const parts = rgb.slice(4, -1).split(',');

    const hexParts = parts.map(part => {
        const hex = parseInt(part, 10).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    });

    return '#' + hexParts.join('');
}













class Code {
    constructor() {
        this.element = null;
        this.identifier = null;
        this.elementComputedStyle = null;
        this.elementNonDefaultStyle = {};
        this.viewer = $('<div>').attr('id', 'InspectorWindow');

        this.boundMouseClick = this.mouseClick.bind(this);
        this.boundMouseOver = this.mouseOver.bind(this);
        this.boundMouseOut = this.mouseOut.bind(this);
        this.boundMouseMove = this.mouseMove.bind(this);

        this.buildViewer();
        this.addEventListeners();
    }



    addEventListeners() {
        $(document).on("click", this.boundMouseClick);
        $(document).on("mouseover", this.boundMouseOver );
        $(document).on("mouseout", this.boundMouseOut);
        $(document).on("mousemove", this.boundMouseMove);
    }

    mouseMove(e) {
        let viewer = this.viewer;
        let xOffset = 20;
        let yOffset = 20;

        let browserRightEdge = parseFloat(window.innerWidth);
        let browserBottomEdge = parseFloat(window.innerHeight);

        let viewerWidth = $(viewer).outerWidth(true);
        let viewerHeight = $(viewer).outerHeight(true);
        let viewerRightEdge = e.clientX + parseFloat(viewerWidth) + xOffset;
        let viewerBottomEdge = e.clientY + parseFloat(viewerHeight) + yOffset;

        let viewerX = e.pageX + xOffset;
        let viewerY = e.pageY + yOffset;
        let viewerNewX = e.pageX - parseFloat(viewerWidth) - xOffset;
        let viewerNewY = e.pageY - parseFloat(viewerHeight) - yOffset;
        let viewerNewXisOnscreen = viewerNewX > 0;
        let viewerNewYisOnscreen = viewerNewY > 0;


        viewer.css('position', 'absolute');

        if (viewerRightEdge > browserRightEdge) {
            if (viewerNewXisOnscreen)
                viewer.css('left', viewerNewX + 'px');
            else
                viewer.css('left', '0px');
        }
        else
            viewer.css('left', viewerX + 'px');

        if (viewerBottomEdge > browserBottomEdge) {
            if (viewerNewYisOnscreen)
                viewer.css('top', viewerNewY + 'px');
            else
                viewer.css('top', '0px');
        }
        else
            viewer.css('top', viewerY + 'px');


        


       

    }

    mouseOver(e) {
        this.element = e.target;
        let ignoreElement = IGNORE_CLASSES.some(cls => $(this.element).hasClass(cls));

        this.setNonDefaultStyle(this.element, TYPOGRAPHY)
        this.setNonDefaultStyle(this.element, BOX)
        this.setNonDefaultStyle(this.element, POSITIONING)
        this.setNonDefaultStyle(this.element, TRANSFORMS)
        this.setNonDefaultStyle(this.element, TABLE)
        this.setNonDefaultStyle(this.element, EFFECT)


        if (ignoreElement) {
            $('#InspectorWindow').css("display", "none");
        } else {
            $('#InspectorWindow').css("display", "block");
            $(this.element).css('outline', '2px dashed red');
        }


        this.fillViewer();
    }

    mouseOut(e) {
        this.elementNonDefaultStyle = {};
        this.viewer.empty().css("display", "none");
        $(this.element).css('outline', 'none');
    }

    mouseClick(e) {
        //console.log(JSON.stringify(this.elementNonDefaultStyle, null, 4));
        //let textToCopy = JSON.stringify(this.elementNonDefaultStyle, null, 4);
        if (this.identifier !== null) {
            appManager.clipboard.add(this.identifier, 'code');
            console.log("click");
        }
        /*navigator.clipboard.writeText(this.identifier).then(function() {
            console.log('Copying to clipboard was successful!');
        }, function(err) {
            console.error('Could not copy text: ', err);
        });*/
    }



    buildViewer() {
        $('html').append(this.viewer);
    }

    fillViewer() {
        let idText = this.element.id ? ' #' + this.element.id : '';
        let classText = this.element.className ? ' .' + this.element.className : '';
        this.identifier = '<' + this.element.tagName.toLowerCase() + '>' + idText + classText;

        let $identifier = $('<p>')
            .attr('id', 'InspectorWindow_Identifier')
            .text(this.identifier);

        this.viewer.append($identifier);

        for (let key in this.elementNonDefaultStyle) {

            let $p = $('<p>').attr('id', 'InspectorWindow_' + key);
            //this.viewer.append($p);

            let $property = $('<span>')
                .attr('id', 'InspectorWindow_' + key)
                .addClass('InspectorWindow_property')
                .text(`${key}: `);

            let $value = $('<span>')
                .attr('id', 'InspectorWindow_' + this.elementNonDefaultStyle[key])
                .addClass('InspectorWindow_cssValue')
                .text(this.elementNonDefaultStyle[key]);

            $p.append($property, $value);
            this.viewer.append($p);

        }


    }


    setNonDefaultStyle(element, category) {

        for (let property in category) {

            let value = getCSSProperty(element, property);
            let defaultValue = category[property];

            if (value != defaultValue) {
                this.elementNonDefaultStyle[property] = value;
            }
        }
    }



    removeEventListeners() {
        $(document).off("click", this.boundMouseClick);
        $(document).off("mouseover", this.boundMouseOver);
        $(document).off("mouseout", this.boundMouseOut);
        $(document).off("mousemove", this.boundMouseMove);
    }





    close() {
        console.log('closing viewer');
        this.viewer.remove();
        this.removeEventListeners();
        $(this.element).css('outline', 'none');
    }




}










