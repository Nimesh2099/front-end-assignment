````markdown
# SlotMachineGame

A simple yet fully functional slot machine game built with **PIXI.js** and modern JavaScript (ES6). This project demonstrates clean architecture, smooth animations, responsive design, and solid game logic including paylines and payout calculation.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Code Structure](#code-structure)
- [Game Mechanics](#game-mechanics)
- [Assets](#assets)
- [Controls](#controls)
- [Contributing](#contributing)
- [License](#license)

---

---

## Features

- Responsive canvas that fits the browser window  
- 5x3 reel layout with 5 reels and 3 visible symbols each  
- Custom reel sets with varied symbols  
- Spin animation lasting 2 seconds for realistic effect  
- Multiple paylines with custom patterns  
- Payout calculations based on matching symbols on paylines  
- Win display with dynamic formatting  
- Spin button with click and keyboard support (Space or Enter)  
- Asset loading with progress indicator  
- Graceful error handling for asset loading  
- Debounced window resize for performance optimization  
- Clean, modular, and well-commented code using ES6 class syntax  

---

## Installation

1. Clone the repository or download the ZIP:

```bash
git clone https://github.com/yourusername/SlotMachineGame.git
````

2. Navigate into the project folder:

```bash
cd SlotMachineGame
```

3. Run a local web server (e.g. Python 3):

```bash
python -m http.server 8000
```

4. Open your browser and visit:

```
http://localhost:8000
```

---

## Usage

* Click the **Spin** button or press **Space** / **Enter** to start spinning the reels.
* Wait for the spin animation to finish.
* Check the payout details displayed below the spin button.
* Resize the browser window to see responsive adjustments.

---

## Code Structure

* **SlotMachineGame class** encapsulates all game logic, rendering, and interactions.
* **Game State** includes reels, paylines, paytable, and current reel positions.
* **Asset Loading** uses PIXI's asset bundles with a progress loader.
* **Game Containers** organize PIXI display objects for reels, buttons, and UI.
* **Event Listeners** handle user input and window resize events with debouncing.
* **Spin Logic** performs animated reel rotations and randomizes final positions.
* **Win Calculation** checks paylines for matching symbols and calculates payouts.
* **Win Display** updates text with clear formatting and adaptive font sizing.

---

## Game Mechanics

* 5 reels, each with 20 symbols.
* 3 visible symbols per reel (rows).
* Predefined paylines as arrays of \[column, row] coordinates.
* Wins occur when 3 or more consecutive matching symbols appear from left to right on any payline.
* Payouts vary by symbol and number of matches, defined in the paytable.

---

## Assets

Place the following assets in the `assets/` folder:

| Asset Name       | Purpose             |
| ---------------- | ------------------- |
| hv1\_symbol.png  | High-value symbol 1 |
| hv2\_symbol.png  | High-value symbol 2 |
| hv3\_symbol.png  | High-value symbol 3 |
| hv4\_symbol.png  | High-value symbol 4 |
| lv1\_symbol.png  | Low-value symbol 1  |
| lv2\_symbol.png  | Low-value symbol 2  |
| lv3\_symbol.png  | Low-value symbol 3  |
| lv4\_symbol.png  | Low-value symbol 4  |
| spin\_button.png | Spin button image   |

*Make sure filenames and paths exactly match the code.*

---

## Controls

| Control           | Action                                  |
| ----------------- | --------------------------------------- |
| Click Spin Button | Start spinning reels                    |
| Space / Enter     | Start spinning reels (keyboard support) |

---

## Contributing

Contributions are welcome! Feel free to open issues or pull requests for:

* New features or improvements
* Additional symbols or paylines
* UI and animation enhancements
* Bug fixes and optimizations

---

## License

This project is licensed under the MIT License.

---

Thank you for trying out SlotMachineGame! 🎰