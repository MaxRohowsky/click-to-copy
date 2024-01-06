// Get the color at the current mouse position

class Dropper {
    constructor() {
        this.document = document;
        this.color = null;
        this.startEyeDropper().then((color) => {
            console.log(color);
        });;
    }

    async startEyeDropper() {
        const eyeDropper = new EyeDropper();
        try {
            const result = await eyeDropper.open();
            this.color = result.sRGBHex;
        } catch (e) {
            this.color = null;
        }
    }


}

