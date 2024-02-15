// This handles the injection of the appManager into the page
$(function () {
    //let appManager;
    if ($("#Menu").length === 0) {
        window.appManager = new AppManager();
        window.appManager.inject()
    }
    else{
        console.log('Menu already exists');
    }
});
