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

console.log(trapLocations);
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
    cellDiv.style = `grid-column-start: ${cell.posX}; grid-column-end: ${cell.posX + 1}; grid-row-start: ${cell.posY}; grid-row-end: ${cell.posY + 1};`
    cellDiv.innerText = `${cell.posX}, ${cell.posY}`;
    gameBoard.appendChild(cellDiv)
})


// place Wumpus
// while (!wumpus) {
//     let wI = Math.floor(Math.random() * cells.length);
//     if (!cells[wI].isPit) {
//         cells[wI].isWumpus = true;
//         const x = cells[wI].posX;
//         const y = cells[wI].posY;
//         cells.map(cell => {
//             if ((cell.posX >= x - 1 && cell.posX <= x + 1) && (cell.posY >= y - 1 && cell.posY <= y + 1)) {
//                 cell.isNear = true;
//             }
//         });
//     }
// }


console.log(cells);

