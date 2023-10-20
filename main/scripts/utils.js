function UpdateHTMLValue(inputElement, property) 
{
    $(viewer.currentElement).attr(property, inputElement.html());
}

function UpdateValue(inputElement, property) 
{
    viewer.currentElement.style[property] = inputElement.html();
}

function GetHTMLAttributeValue(elementHTML, property) 
{
    if (elementHTML[property]) {
        return elementHTML[property]
    }

}

function GetCSSProperty(elementStyle, property) 
{
    return elementStyle.getPropertyValue(property)
}

function SetHTMLPropertyIfv2(elementHTML, property, condition) 
{
    if(condition){
        var value = elementHTML.attributes.getNamedItem(property).value
        
        $('#InspectorWindow_' + property + ' .InspectorWindow_attribute').css('display', 'inline')
        $('#InspectorWindow_' + property + ' .InspectorWindow_htmlvalue').css('display', 'inline')

        $('#InspectorWindow_' + property + ' .InspectorWindow_attribute').text(property + ": ");
        $('#InspectorWindow_' + property + ' .InspectorWindow_htmlvalue').text( value );
    }
    else{
        $('#InspectorWindow_' + property + ' .InspectorWindow_attribute').css('display', 'none')
        $('#InspectorWindow_' + property + ' .InspectorWindow_htmlvalue').css('display', 'none')
    }
    
}

function SetHTMLPropertyIf(elementHTML, property, condition) 
{
    var value = GetHTMLAttributeValue(elementHTML, property)

    if(condition){
        $('#InspectorWindow_' + property + ' .InspectorWindow_attribute').css('display', 'inline')
        $('#InspectorWindow_' + property + ' .InspectorWindow_htmlvalue').css('display', 'inline')

        $('#InspectorWindow_' + property + ' .InspectorWindow_attribute').text(property + ": ");
        $('#InspectorWindow_' + property + ' .InspectorWindow_htmlvalue').text( value );
    }
    else{
        $('#InspectorWindow_' + property + ' .InspectorWindow_attribute').css('display', 'none')
        $('#InspectorWindow_' + property + ' .InspectorWindow_htmlvalue').css('display', 'none')
    }
    
}

function SetCSSPropertyIf(elementStyle, property, condition) 
{
    var value = GetCSSProperty(elementStyle, property)

    if (condition) {
        $('#InspectorWindow_' + property + ' .InspectorWindow_property').css('display', 'inline')
        $('#InspectorWindow_' + property + ' .InspectorWindow_cssvalue').css('display', 'inline')

        $('#InspectorWindow_' + property + ' .InspectorWindow_property').text(property + ": ");
        $('#InspectorWindow_' + property + ' .InspectorWindow_cssvalue').text(value);
    }
    else {
        $('#InspectorWindow_' + property + ' .InspectorWindow_property').css('display', 'none')
        $('#InspectorWindow_' + property + ' .InspectorWindow_cssvalue').css('display', 'none')
    }

}