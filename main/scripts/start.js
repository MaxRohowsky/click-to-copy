let viewer;
let bin;
let appMenu;



chrome.runtime.onMessage.addListener(function (request) {
    if (request.action === 'injectCode') {
      // Your code injection logic here
      console.log('Code injected!');
      $(function () {

        // Create the appMenu
        appMenu = new AppMenu();
        appMenu.Build();
        appMenu.Inject()
    
    
       // appMenu.ViewerStart();
        appMenu.BinButton();
    
    
    
    
    
        appMenu.closeButton.on("click", function () {
            if (viewer){
                viewer.RemoveEventListeners();
                $('#InspectorWindow_container').remove();
                viewer = null;
            }
    
            
        
            $('#viewerMenu').remove();
    
            
        });
    
    
    
    
    });
    }
  });

