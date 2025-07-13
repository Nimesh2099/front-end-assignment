// SlotMachineGame class will manage all the game's logic and visuals
class SlotMachineGame {
    constructor() {
        this.initializeApp();
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
}

// Start the game when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new SlotMachineGame();
});
