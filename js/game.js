// SlotMachineGame class will manage all the game's logic and visuals
class SlotMachineGame {
    constructor() {
        this.initializeApp();
        this.setupGameState();

        this.initLoader();
        this.loadAssets();

        window.addEventListener('resize', () => this.onResize());
        this.onResize();
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

    // Load assets required for the game
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
            this.setupGame();
            
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

    setupGame(){
        this.app.stage.removeChild(this.loaderContainer);
        this.loaderContainer.destroy();

        this.createGameContainer();
        this.createReels();
        this.createSpinButton();
        this.createWinDisplay();

        this.updateSymbols();
        this.centerGame();

        

        
    }

    setupGameState() {
    this.loaded = false;
    this.spinning = false;
    this.assets = {};
    //this.currentPositions = [0, 0, 0, 0, 0];
    this.currentPositions = [0, 11, 1, 10, 14];


    this.reelset = [
        ["hv2", "lv3", "lv3", "hv1", "hv1", "lv1", "hv1", "hv4", "lv1", "hv3", 
         "hv2", "hv3", "lv4", "hv4", "lv1", "hv2", "lv4", "lv1", "lv3", "hv2"],
        ["hv1", "lv2", "lv3", "lv2", "lv1", "lv1", "lv4", "lv1", "lv1", "hv4", 
         "lv3", "hv2", "lv1", "lv3", "hv1", "lv1", "lv2", "lv4", "lv3", "lv2"],
        ["lv1", "hv2", "lv3", "lv4", "hv3", "hv2", "lv2", "hv2", "hv2", "lv1", 
         "hv3", "lv1", "hv1", "lv2", "hv3", "hv2", "hv4", "hv1", "lv2", "lv4"],
        ["hv2", "lv2", "hv3", "lv2", "lv4", "lv4", "hv3", "lv2", "lv4", "hv1", 
         "lv1", "hv1", "lv2", "hv3", "lv2", "lv3", "hv2", "lv1", "hv3", "lv2"],
        ["lv3", "lv4", "hv2", "hv3", "hv4", "hv1", "hv3", "hv2", "hv2", "hv4", 
         "hv4", "hv2", "lv2", "hv4", "hv1", "lv2", "hv1", "lv2", "hv4", "lv4"]
    ];

    this.paytable = {
        hv1: [10, 20, 50],
        hv2: [5, 10, 20],
        hv3: [5, 10, 15],
        hv4: [5, 10, 15],
        lv1: [2, 5, 10],
        lv2: [1, 2, 5],
        lv3: [1, 2, 3],
        lv4: [1, 2, 3]
    };

    this.paylines = [
        [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]],
        [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1]],
        [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2]],
        [[0, 1], [1, 1], [2, 2], [3, 2], [4, 2]],
        [[0, 2], [1, 2], [2, 1], [3, 1], [4, 1]],
        [[0, 1], [1, 2], [2, 1], [3, 2], [4, 1]],
        [[0, 2], [1, 1], [2, 2], [3, 1], [4, 2]]
    ];
}


    createGameContainer() {
        this.gameContainer = new PIXI.Container();
        this.app.stage.addChild(this.gameContainer);
    }

    createReels() {
        const reelWidth = 120;
        const symbolHeight = 120;
        const gap = 20;

        this.symbols = [];

        for (let col = 0; col < 5; col++) {
            this.symbols[col] = [];

            for (let row = 0; row < 3; row++) {
            const symbol = new PIXI.Sprite();
            symbol.anchor.set(0.5);
            symbol.width = reelWidth - 10;
            symbol.height = symbolHeight - 10;
            symbol.x = col * (reelWidth + gap);
            symbol.y = row * symbolHeight;
            this.gameContainer.addChild(symbol);
            this.symbols[col][row] = symbol;
            }
        }
    }

    createSpinButton() {
        this.spinButton = new PIXI.Sprite(this.assets.spinButton);
        this.spinButton.anchor.set(0.5);
        this.spinButton.interactive = true;
        this.spinButton.buttonMode = true;

        this.spinButton.on('pointerdown', () => this.handleSpin());
        this.gameContainer.addChild(this.spinButton);
    }

    createWinDisplay() {
        this.winText = new PIXI.Text('', {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0xffffff,
            align: 'left',
            wordWrap: true,
            wordWrapWidth: 500
        });
        this.winText.anchor.set(0.5, 0);
        this.gameContainer.addChild(this.winText);
    }

    centerGame() {
    if (!this.gameContainer) return;

        this.gameContainer.x = this.app.screen.width / 2 - this.gameContainer.width / 2;
        this.gameContainer.y = this.app.screen.height * 0.1;

        // Position spin button
        this.spinButton.x = this.gameContainer.width / 2;
        this.spinButton.y = 3 * 120 + 50;

        // Position win text
        this.winText.x = this.gameContainer.width / 2;
        this.winText.y = this.spinButton.y + this.spinButton.height / 2 + 30;
        this.winText.style.wordWrapWidth = Math.min(500, window.innerWidth * 0.8);
    }

    onResize() {
        this.app.renderer.resize(window.innerWidth, window.innerHeight);

        if (this.loaded) {
            this.centerGame();
        } else {
            this.centerLoader();
        }
    }

    handleSpin() {
        if (this.spinning) return;

        this.spinning = true;

        // Generate random symbol positions for each reel
        for (let i = 0; i < 5; i++) {
            this.currentPositions[i] = Math.floor(Math.random() * this.reelset[i].length);
        }

        this.updateSymbols();
        this.calculateWins();

        this.spinning = false;
    }

    updateSymbols() {
        for (let col = 0; col < 5; col++) {
            const reel = this.reelset[col];
            const position = this.currentPositions[col];

            for (let row = 0; row < 3; row++) {
                const symbolIndex = (position + row) % reel.length;
                const symbolId = reel[symbolIndex];
                this.symbols[col][row].texture = this.assets[symbolId];
            }
        }
    }

    getSymbolAt(col, row) {
        const reel = this.reelset[col];
        const position = this.currentPositions[col];
        const symbolIndex = (position + row) % reel.length;
        return reel[symbolIndex];
    }

    calculateWins() {
        const wins = [];
        let totalWin = 0;

        for (let i = 0; i < this.paylines.length; i++) {
            const payline = this.paylines[i];
            const firstSymbol = this.getSymbolAt(payline[0][0], payline[0][1]);
            let matchCount = 1;

            for (let j = 1; j < payline.length; j++) {
                const symbol = this.getSymbolAt(payline[j][0], payline[j][1]);
                if (symbol === firstSymbol) {
                    matchCount++;
                } else {
                    break;
                }
            }

            if (matchCount >= 3 && this.paytable[firstSymbol]) {
                const payout = this.paytable[firstSymbol][matchCount - 3];
                totalWin += payout;
                wins.push({
                    payline: i + 1,
                    symbol: firstSymbol,
                    count: matchCount,
                    payout
                });
            }
        }

        this.updateWinDisplay(totalWin, wins);
    }

    updateWinDisplay(totalWin, wins) {
        if (totalWin === 0) {
            this.winText.text = "No wins this spin";
            return;
        }

        let winText = `Total wins: ${totalWin}\n`;

        wins.forEach(win => {
            winText += `- payline ${win.payline}, ${win.symbol} x${win.count}, ${win.payout}\n`;
        });

        this.winText.text = winText;
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
