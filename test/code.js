//https://stackoverflow.com/questions/22907735/get-the-computed-style-and-omit-defaults
//https://stackoverflow.com/questions/2664045/how-to-get-an-html-elements-style-values-in-javascript

//delete
class Code {
    constructor() {
        this.addEventListeners();
        console.log("Code");
    }



    addEventListeners() {

        $('#lorem').on('click', function() {
            console.log(this);
            let computedStyle = window.getUserStyles(this);
            console.log(computedStyle);
        });
    }


    close() {

    }




}