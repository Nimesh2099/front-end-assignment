// SlotMachineGame class will manage all the game's logic and visuals
class SlotMachineGame {
    constructor() {
        this.initializeApp();
        this.initLoader();
        this.loadAssets();
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

    async loadAssets() {
        const assetManifest = {
            "hv1": "assets/hv1_symbol.png",
            "hv2": "assets/hv2_symbol.png",
            "hv3": "assets/hv3_symbol.png",
            "hv4": "assets/hv4_symbol.png",
            "lv1": "assets/lv1_symbol.png",
            "lv2": "assets/lv2_symbol.png",
            "lv3": "assets/lv3_symbol.png",
            "lv4": "assets/lv4_symbol.png",
            "spinButton": "assets/spin_button.png",
        };

        try{
            PIXI.Assets.addBundle('gameAssets', assetManifest);

            //load with progress callback
            this.assets = await PIXI.Assets.loadBundle('gameAssets', (progress) => {
                this.loaderText.text = `Loading: ${Math.floor(progress * 100)}%`;
            });

            //When done, flag as loaded
            this.loaded = true;
            
        } catch (error) {
            console.error('Error loading assets:', error);
            this.loaderText.text = 'Error loading assets';
        }
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
