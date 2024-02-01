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

                    navigator.clipboard.writeText(this.color)
                    appManager.clipboard.add(this.color, 'colors')
                })

        });


    }

    close() {
        console.log('closing color');
        
        $(document).off('click');
    }


}

