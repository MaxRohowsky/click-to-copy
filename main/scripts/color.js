// Get the color at the current mouse position

class Color {
    constructor() {
        this.color = null;
        this.start();
    }

    start() {
        $(document).on('click', (e) => {

            const eyeDropper = new EyeDropper();
            eyeDropper
                .open()
                .then((result) => {
                    this.color = result.sRGBHex;
                    
                    let copiedColor = new CopiedObj('color', this.color);
                    appManager.clipboard.copiedObjs.push(copiedColor);
                    appManager.clipboard.refreshClipboard();
                    this.close();

                })

        });


    }

    close() {
        console.log('closing color');

        $(document).off('click');
    }


}
