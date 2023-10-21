function UpdateHTMLValue(field, attribute) 
{
    $(viewer.currentElement).attr(attribute, field.html());
}

function UpdateCSSValue(field, property) 
{
    console.log(property);
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
    }
    else{
        $('#InspectorWindow_' + attribute + ' .InspectorWindow_attribute').css('display', 'none')
        $('#InspectorWindow_' + attribute + ' .InspectorWindow_htmlValue').css('display', 'none')
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