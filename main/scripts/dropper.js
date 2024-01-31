// Get the color at the current mouse position

class Dropper {
    constructor() {
        this.document = document;
        this.color = null;
        this.startEyeDropper();
    }

    async startEyeDropper() {
        const eyeDropper = new EyeDropper();
        try {
            const result = await eyeDropper.open();
            this.color = result.sRGBHex;
            //console.log(this.color);
            navigator.clipboard.writeText(this.color)

        } catch (e) {
            this.color = null;
        }
    }


}

