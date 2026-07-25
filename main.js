/*
    * radomly generate traps (probably part of setup to gen x number and then place them)
    * randomly generate wumpus location (does it move?)
    * randomly generate start position (but not near wumpus)
*/

const width = 10;
const height = width;
const seed = undefined;
const numTraps = 4;
const trapLocations = [];
let wumpus = false;
let player = false

const cells = generateMaze(width, height, seed);

// add traps
let placedTraps = 0;
while (placedTraps < numTraps) {
    let tI = Math.floor(Math.random() * cells.length);
    if (!cells[tI].isPit) {
        cells[tI].isPit = true;
        trapLocations.push(tI);
        placedTraps++;
    }
}

// place Wumpus
while (!wumpus) {
    let wI = Math.floor(Math.random() * cells.length);
    if (!cells[wI].isPit) {
        cells[wI].isWumpus = true;
        const x = cells[wI].posX;
        const y = cells[wI].posY;
        cells.map(cell => {
            if (cell.isNeghbor(x, y)) {
                cell.isWarning = true;
            }
        });
        wumpus = { x, y, i: wI };
    }
}

// place player

// draw gameboard
const gameBoard = document.getElementById("game-board");
cells.forEach(cell => {
    const cellDiv = document.createElement('div')
    cellDiv.classList.add('cell');
    if (cell.exitTop) {
        cellDiv.classList.add('top-door');
    }
    if (cell.exitRight) {
        cellDiv.classList.add('right-door');
    }
    if (cell.exitDown) {
        cellDiv.classList.add('bottom-door');
    }
    if (cell.exitLeft) {
        cellDiv.classList.add('left-door');
    }
    if (cell.isPit) {
        cellDiv.classList.add('trap');
    }
    if (cell.isWumpus) {
        cellDiv.classList.add('wumpus');
    }
    if (cell.isPlayer) {
        cellDiv.classList.add('isPlayer');
    }
    if (cell.isWarning) {
        cellDiv.classList.add('warning');
    }





    cellDiv.style = `grid-column-start: ${cell.posX}; grid-column-end: ${cell.posX + 1}; grid-row-start: ${cell.posY}; grid-row-end: ${cell.posY + 1};`
    cellDiv.innerText = `${cell.posX}, ${cell.posY}`;
    gameBoard.appendChild(cellDiv)
})


console.log(cells);

