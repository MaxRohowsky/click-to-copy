
/*
Scope: 
- A good viewer
- Movable with mouse
- on off toggle
- Adjust Styling
- Copy function
- Multiple of them
- DIfferentiator HTML and CSS

*/




var Viewer_Element_CSS

var Viewer_Typography = new Array(
    'font-family',
    'font-size',
    'font-style',
    'color'
);




//console.log(document.styleSheets)

function GetCurrentDocument() 
{
    return window.document;
}

/*
* Triggered when mouse moves within element boundaries
*/ 

function UpdateValue(x){
    console.log(x.innerHTML);
    console.log(viewer.selectedElement.style.fontSize);
    viewer.selectedElement.style.fontSize = x.innerHTML;
    //x.innerHTML = x.getPropertyValue(Viewer_Typography[1]);
    //elm.style.fontSize = x.innerHTML;
}

//function SubmitValue(e){
    //console.log(e.srcElement.innerHTML)

//}


function ViewerMouseOver(e) 
{
    if (this.tagName != 'body') {
        this.style.outline = '1px dotted #f00';
        //this.style.fontSize = '100px'; //works!
        viewer.selectedElement = this
    }
    //console.log(this)
    

    document.getElementById('text').append(String(this))

    e.stopPropagation();

    var element = document.defaultView.getComputedStyle(this, null);

    // generate simple css definition
    Viewer_Element_CSS = this.tagName.toLowerCase() + (this.id == '' ? '' : ' #' + this.id) + (this.className == '' ? '' : ' .' + this.className);


 //experimentinng
 
    var attribute = document.createElement('p') //change to span
    attribute.textContent = Viewer_Typography[1] //add font size
    
    document.getElementById('text').append(attribute)

    var valuex = document.createElement('p')

    
    valuex.innerHTML = element.getPropertyValue('font-size');
    valuex.contentEditable = true;
    valuex.addEventListener("input", () => UpdateValue(valuex), false)
    document.getElementById('text').append(valuex)
    

    //valuex.addEventListener("input", () => UpdateValue(valuex, element), false)
    


   // setInterval(() => {
     //   if (viewer.selectedElement && viewer.selectedElement.style) {
       //     viewer.selectedElement.style.fontSize = '100px';
       // }
    //}, 3000); // Adjust the interval as needed





    for (var i = 0; i < Viewer_Typography.length; i++){
        //Viewer_Element_CSS += "\t" + Viewer_Typography[i] + ': ' + element.getPropertyValue(Viewer_Typography[i]) + ";\n";
        // create a child
        var attribute = document.createElement('p') //change to span
        attribute.textContent = Viewer_Typography[i]
        document.getElementById('text').append(attribute)

        var value = document.createElement('p')
        value.id = Viewer_Typography[i];
        
        value.innerHTML = element.getPropertyValue(Viewer_Typography[i]);

        document.getElementById('text').append(value)
        value.contentEditable = true;

        value.addEventListener("input", () => UpdateValue(value), false)
        //value.removeEventListener("blur", SubmitValue, false)
    }  
   
        

    //console.log(document.getElementById(Viewer_Typography[1]).textContent)



        // append child to code
    
    
    
        //document.getElementById('code').append(Viewer_Element_CSS)
    //document.getElementById('code').appendChild(document.createElement('p'))
}

/*
* Triggered when mouse moves within element boundaries
*/ 
function ViewerMouseOut(e) {
    this.style.outline = '';
    document.getElementById('text').innerHTML = '';
    e.stopPropagation();

    
    
}

/*
* Triggered when mouse moves within element boundaries
*/
function ViewerMouseMove(e) {
    

    var document = GetCurrentDocument();
	var block = document.getElementById('text');
   // console.log(block.style)

	//block.style.display = 'block';
    block.style.position = 'absolute';

    //var blockWidth = 332;
	//var blockHeight = 100;

    block.style.left = e.pageX+ 'px';;
    block.style.top = e.pageY+ 20+ 'px';


    e.stopPropagation();


}



/*
* Viewer Class
*/
class Viewer {
    constructor() {
        this.haveEventListeners = false;
        this.selectedElement = null;
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


    ViewerWindow = function(){

        var block = document.createElement('div');
		block.id = 'Viewer';

        var text = document.createElement('div');

		text.id = 'text';

			//< 
		text.appendChild( document.createTextNode('TEST') ); 
		block.appendChild(text);

        return block;
    }




    // Add event listeners for all elements in the current document
    AddEventListeners = function () {
        var document = GetCurrentDocument();
        var elements = this.GetAllElements(document.body);

        for (var i = 0; i < elements.length; i++) {
            //ViewerMouseOver is executed when mouseover event is triggered
            elements[i].addEventListener("mouseover", ViewerMouseOver, false);
            elements[i].addEventListener("mouseout", ViewerMouseOut, false);
            elements[i].addEventListener("mousemove", ViewerMouseMove, false);
        }
        this.haveEventListeners = true;
    }

    RemoveEventListeners = function () {
        var document = GetCurrentDocument();
        var elements = this.GetAllElements(document.body);

        for (var i = 0; i < elements.length; i++) {
            elements[i].removeEventListener("mouseover", ViewerMouseOver, false);
            elements[i].removeEventListener("mouseout", ViewerMouseOut, false);
            elements[i].removeEventListener("mousemove", ViewerMouseMove, false);
        }
        this.haveEventListeners = false;
    }

    Freeze = function () {
        if (this.haveEventListeners) {
            this.RemoveEventListeners();

            return true;
        }
        return false;
    }

    Unfreeze = function () {

        if (!this.haveEventListeners) {
            // Remove the red outline
            this.AddEventListeners();

            return true;
        }
        return false;
    }


    
    isEnabled = function()
    {
        var document = GetCurrentDocument();
        
        if (document.getElementById('Viewer')){
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
            //console.log(e)
        }
        else {
            viewer.Unfreeze();
        }
    }
    if (e.key === 'h') {
        //console.log(this.selectedElement);
        //this.selectedElement.style.color = 'red';
        //console.log("executed")
        //var elm = this.selectedElement
        //elm.style.fontSize = '100px';
    }

}



/* point of entry */
const viewer = new Viewer()

var document = GetCurrentDocument()
var ablock = document.getElementById('Viewer');

if(!ablock){
    var block = viewer.ViewerWindow();
    document.body.appendChild(block);
}


viewer.AddEventListeners();
//viewer.logToConsole();


document.onkeydown = Viewer_Keypress;


    //setInterval(function() {
      //  try{
        //if(viewer.selectedElement.style != null){
        //viewer.selectedElement.style.fontSize = '100px';}
    //}
    //catch(error){
        
    //}
    //}, 3000);


   // setInterval(() => {
     //   if (viewer.selectedElement && viewer.selectedElement.style) {
       //     viewer.selectedElement.style.fontSize = '100px';
       // }
    //}, 3000); // Adjust the interval as needed
