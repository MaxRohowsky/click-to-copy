function UpdateHTMLValue(field, attribute) 
{
    $(viewer.currentElement).attr(attribute, field.html());
}

function UpdateCSSValue(field, property) 
{
    console.log(viewer.currentElement.style[property]);
    console.log(field.html());
    viewer.currentElement.style[property] = field.html();
}

function GetCSSProperty(element, property) 
{
    var elementStyle = document.defaultView.getComputedStyle(element, null);
    return elementStyle.getPropertyValue(property)
}

function SetHTMLAttributeIf(element, attribute, condition) 
{
    if(condition){
        var value = element.attributes.getNamedItem(attribute).value
        
        $('#InspectorWindow_' + attribute + ' .InspectorWindow_attribute').css('display', 'inline')
        $('#InspectorWindow_' + attribute + ' .InspectorWindow_htmlValue').css('display', 'inline')

        $('#InspectorWindow_' + attribute + ' .InspectorWindow_attribute').text(attribute + ": ");
        $('#InspectorWindow_' + attribute + ' .InspectorWindow_htmlValue').text( value );

        return 1;
    }
    else{
        $('#InspectorWindow_' + attribute + ' .InspectorWindow_attribute').css('display', 'none')
        $('#InspectorWindow_' + attribute + ' .InspectorWindow_htmlValue').css('display', 'none')

        return 0;
    }
}

function SetCSSPropertyIf(element, property, condition) 
{
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

function getImages(element, includeDuplicates = false) 
{
    var images = [];
   
    images = [...element.getElementsByTagName('img')].map(img =>
        img.getAttribute('src')
    );

    if(element.tagName === "IMG"){
        console.log(element.getAttribute("src"));
        images.push(element.getAttribute("src"))
    }

    return includeDuplicates ? images : [...new Set(images)];
}



function SetHTMLAttributes(element)
{
    viewer.nrAttributes += SetHTMLAttributeIf(element,    'id',                element.attributes.getNamedItem('id')    != null);
    viewer.nrAttributes += SetHTMLAttributeIf(element,    'class',             element.attributes.getNamedItem('class') != null);
    viewer.nrAttributes += SetHTMLAttributeIf(element,    'src',               element.attributes.getNamedItem('src')   != null);
    viewer.nrAttributes += SetHTMLAttributeIf(element,    'href',              element.attributes.getNamedItem('href')  != null);
    viewer.nrAttributes += SetHTMLAttributeIf(element,    'alt',               element.attributes.getNamedItem('alt')   != null);
    viewer.nrAttributes += SetHTMLAttributeIf(element,    'placeholder',       element.attributes.getNamedItem('placeholder') != null);
    viewer.nrAttributes += SetHTMLAttributeIf(element,    'width',             element.attributes.getNamedItem('width') != null);

    if(viewer.nrAttributes > 0)
        $('#InspectorWindow_htmlTitle').css('display', 'inline')
    else
        $('#InspectorWindow_htmlTitle').css('display', 'none')
}



function SetAssets(element)
{
    var assets = getImages(element);

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

    if(assets.length > 0)
        $('#InspectorWindow_assetsTitle').css('display', 'inline')
    else
        $('#InspectorWindow_assetsTitle').css('display', 'none')
}











function SetCSSProperties(element)
{
    SetCSSPropertyIf(element, 'font-size', true);
    SetCSSPropertyIf(element, 'font-weight', GetCSSProperty(element, 'font-weight') != '400');
    SetCSSPropertyIf(element, 'font-style', GetCSSProperty(element, 'font-style') != 'normal');
    SetCSSPropertyIf(element, 'color', true);
    SetCSSPropertyIf(element, 'font-family', true);

    SetCSSPropertyIf(element, 'height', GetCSSProperty(element, 'height') != 'auto');
    SetCSSPropertyIf(element, 'width', GetCSSProperty(element, 'width') != 'auto');
    SetCSSPropertyIf(element, 'border', true);
    SetCSSPropertyIf(element, 'border-top', true);
    SetCSSPropertyIf(element, 'border-right', true);

    SetCSSPropertyIf(element, 'top', GetCSSProperty(element, 'top') != 'auto');
    SetCSSPropertyIf(element, 'bottom', GetCSSProperty(element, 'bottom') != 'auto');
    SetCSSPropertyIf(element, 'right', GetCSSProperty(element, 'right') != 'auto');
    SetCSSPropertyIf(element, 'left', GetCSSProperty(element, 'left') != 'auto');
    SetCSSPropertyIf(element, 'z-index', GetCSSProperty(element, 'z-index') != 'auto');
}




function AddEditEventListenersCSS(property)
{
    $('#InspectorWindow_' + property + ' .InspectorWindow_cssValue').on("input", () => {
        UpdateCSSValue($('#InspectorWindow_' + property + ' .InspectorWindow_cssValue'), property);
    });
}

