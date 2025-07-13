// SlotMachineGame class will manage all the game's logic and visuals
class SlotMachineGame {
    constructor() {
        this.initializeApp();
        this.initLoader();
    }

    initializeApp() {
        // Create a new PIXI Application with screen size and quality settings
        this.app = new PIXI.Application({
            width: window.innerWidth, 
            height: window.innerHeight, 
            backgroundColor: 0x1099bb, 
            resolution: window.devicePixelRatio || 1, 
            autoDensity: true 
        });

        // Add the canvas element to the HTML body
        document.body.appendChild(this.app.view);
    }

    initLoader() {
        //create a container for the loader elements
        this.loaderContainer = new PIXI.Container();
        this.app.stage.addChild(this.loaderContainer);

        //background ractangle behind the loader text
        const loaderbg = new PIXI.Graphics()
            .beginFill(0x0a0a3a, 0.8)
            .drawRoundedRect(-150, -50, 300, 100, 15)
            .endFill();
        this.loaderContainer.addChild(loaderbg);

        //create centered text
        this.loaderText = new PIXI.Text('Loading: 0%', {
            fontFamily: 'Arial',
            fontSize: 28,
            fill: 0xffffff,
            align: 'center'
        });
        this.loaderText.anchor.set(0.5);
        this.loaderContainer.addChild(this.loaderText);

        //center the loader text
        this.centerLoader();
    }
    centerLoader() {
        //center the loader text in the middle of the screen
        this.loaderContainer.x = this.app.screen.width / 2;
        this.loaderContainer.y = this.app.screen.height / 2;
    }
}

// Start the game when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new SlotMachineGame();
});
