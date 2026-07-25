const width = 10;
const height = width;
const seed = undefined;
const numTraps = 4;
const trapLocations = [];
let wumpus = false; // { x, y, index }
let player = false; // { x, y, index }
let arrowMode = false;

function movePlayer(key) {
    switch (key) {
        case "ArrowUp":
            console.log('U');
            break;
        case "ArrowRight":
            console.log('R');
            break;
        case "ArrowDown":
            console.log('D');
            break;
        case "ArrowLeft":
            console.log('L');
            break;
    }
};

function fireArrow(key) {
    switch (key) {
        case "ArrowUp":
            console.log('Arrow U');
            break;
        case "ArrowRight":
            console.log('Arrow R');
            break;
        case "ArrowDown":
            console.log('Arrow D');
            break;
        case "ArrowLeft":
            console.log('Arrow L');
            break;
    }
};

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
while (!player) {
    let pI = Math.floor(Math.random() * cells.length);
    if (!cells[pI].isPit && !cells[pI].isWarning && !cells[pI].isWumpus) {
        cells[pI].isPlayer = true;
        player = { x: cells[pI].posX, y: cells[pI].posY, i: pI };
    }
}


// draw gameboard
function drawGameboard () {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";
    cells.forEach(cell => {
        const cellDiv = document.createElement('div')
        cellDiv.classList.add('cell');
        if (arrowMode) {
            cellDiv.classList.add('arrow-mode');
        }
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
        if (cell.isPlayer) {
            cellDiv.classList.add('player');
        }

        cellDiv.style = `grid-column-start: ${cell.posX}; grid-column-end: ${cell.posX + 1}; grid-row-start: ${cell.posY}; grid-row-end: ${cell.posY + 1};`
        cellDiv.innerText = `${cell.posX}, ${cell.posY}`;
        gameBoard.appendChild(cellDiv)
    })
};

drawGameboard();

// event listeners
document.addEventListener("keyup", ({ key }) => {
    if (key === 'a') {
        arrowMode = !arrowMode;
        drawGameboard();
    }
    if (key === "ArrowUp" || key === "ArrowRight" || key === "ArrowDown" || key === "ArrowLeft") {
        if (arrowMode) {
            fireArrow(key)
        } else {
            movePlayer(key)
        }
    }
})

