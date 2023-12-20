class AppMenu {
    constructor() {
        this.appMenu = $('<div id="viewerMenu"></div>');
        this.codeButton = $('<button class="viewerButton"><img src="chrome-extension://laonhdndhpeoachehnobbcjdcnnhlioe/assets/code-icon.svg" alt="Play"></button>');
        this.assetButton = $('<button class="viewerButton"><img src="chrome-extension://laonhdndhpeoachehnobbcjdcnnhlioe/assets/asset-icon.svg" alt="Asset"></button>');
        this.editButton = $('<button class="viewerButton"><img src="chrome-extension://laonhdndhpeoachehnobbcjdcnnhlioe/assets/edit-icon.svg" alt="Asset"></button>');
        this.binButton = $('<button class="viewerButton" id="binButton"><img src="chrome-extension://laonhdndhpeoachehnobbcjdcnnhlioe/assets/trash-icon.svg" alt="Asset"></button>');
        this.closeButton = $('<button class="viewerButton"><img src="chrome-extension://laonhdndhpeoachehnobbcjdcnnhlioe/assets/close-icon.svg" alt="Close"></button>');
    }

    Build = function () {
        this.appMenu.append(this.codeButton);
        this.appMenu.append(this.assetButton);
        this.appMenu.append(this.editButton);
        this.appMenu.append(this.binButton);
        this.appMenu.append(this.closeButton);
    }


    Close = function () {
        this.closeButton.on('click', function () {
            this.destroy();
        });
    }


    ViewerStart = function () {
        // Add a click event handler to the button
        this.codeButton.on("click", function () {

            // Viewer Instance 
            viewer = new Viewer();

            // Check if VeiwerWindow injected
            let document = GetCurrentDocument();
            let inspectorWindow = document.getElementById('InspectorWindow_container');

            // If InspectorWindow not injected, inject!

            if (!inspectorWindow) {
                let inspectorWindow = viewer.BuildInspectorWindow();
                document.body.appendChild(inspectorWindow);
                viewer.AddEventListeners();
            }
        });
    }


    BinButton = function () {
        this.binButton.on('click', function () {

            let binButtonElm = document.getElementById('binButton');

            if (binButtonElm.classList.contains('active')) {
                binButtonElm.classList.remove('active');

            } else {
                binButtonElm.classList.add('active');

                bin = new Bin();
                bin.AddEventListeners();
                console.log('Bin Added');


            }


        });
    }



    EditButton = function () {


    }





    Inject = function () {
        $('body').append(this.appMenu);
    }


}