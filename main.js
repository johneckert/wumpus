const width = 10;
const height = width;
const seed = undefined;
const numTraps = 4;
let arrowMode = false;
const { cells, trapsLocations, player, wumpus } = createGame();

function createGame() {
    const cells = generateMaze(width, height, seed);
    const trapLocations = [];
    let player, wumpus;
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
    return { cells, trapLocations, player, wumpus };
}

function updatePlayerLocation(newCell, oldCell) {
    newCell.isPlayer = true;
    oldCell.isPlayer = false;
    player.x = newCell.posX;
    player.y = newCell.posY;
    player.i = cells.indexOf(newCell);
    drawGameboard();
}

function movePlayer(key) {
    const currentCell = cells[player.i]
    console.log(player);
    console.log(currentCell);
    switch (key) {
        case "ArrowUp":
            console.log('U');
            if (currentCell.exitTop) {
                const newCell = cells.filter((cell) => cell.posX === player.x && cell.posY === player.y - 1)[0];
                updatePlayerLocation(newCell, currentCell);
            } else {
                console.log("Bonk!");
            }
            break;
        case "ArrowRight":
            console.log('R');
            if (currentCell.exitRight) {
                const newCell = cells.filter((cell) => cell.posX === player.x + 1 && cell.posY === player.y)[0];
                updatePlayerLocation(newCell, currentCell);
            } else {
                console.log("Bonk!");
            }
            break;
        case "ArrowDown":
            console.log('D');
            if (currentCell.exitBottom) {
                const newCell = cells.filter((cell) => cell.posX === player.x && cell.posY === player.y + 1)[0];
                updatePlayerLocation(newCell, currentCell);
            } else {
                console.log("Bonk!");
            }
            break;
        case "ArrowLeft":
            console.log('L');
            if (currentCell.exitLeft) {
                const newCell = cells.filter((cell) => cell.posX === player.x - 1 && cell.posY === player.y)[0];
                updatePlayerLocation(newCell, currentCell);
            } else {
                console.log("Bonk!");
            }
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

