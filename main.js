let gameOver = true;
let win = false;
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
      cells[pI].visit();
      player = { x: cells[pI].posX, y: cells[pI].posY, i: pI };
    }
  }
  gameOver = false;
  return { cells, trapLocations, player, wumpus };
}

function findOut(cell, showAlert) {
  if (cell.isPit) {
    gameOver = true;
    drawGameboard();
    alert("You fell in a pit and died!");
  } else if (cell.isWumpus) {
    gameOver = true;
    drawGameboard();
    alert("You stumble upon the Wumpus. It eats you. You died!");
  } else if (cell.isWarning && showAlert) {
    alert("You can hear breathing neaerby, the Wumpus is close!");
  }

}

function updatePlayerLocation(newCell, oldCell) {
  newCell.isPlayer = true;
  oldCell.isPlayer = false;
  player.x = newCell.posX;
  player.y = newCell.posY;
  player.i = cells.indexOf(newCell);
  cells[player.i].visit();
  drawGameboard();
}

function movePlayer(key) {
  const prevCell = cells[player.i]
  switch (key) {
    case "ArrowUp":
      console.log('U');
      if (prevCell.exitTop) {
        const newCell = cells.filter((cell) => cell.posX === player.x && cell.posY === player.y - 1)[0];
        const showAlert = newCell.suppressAlert;
        updatePlayerLocation(newCell, prevCell);
        findOut(newCell, showAlert);
      } else {
        console.log("Bonk!");
      }
      break;
    case "ArrowRight":
      console.log('R');
      if (prevCell.exitRight) {
        const newCell = cells.filter((cell) => cell.posX === player.x + 1 && cell.posY === player.y)[0];
        const showAlert = newCell.suppressAlert;
        updatePlayerLocation(newCell, prevCell);
        findOut(newCell);
      } else {
        console.log("Bonk!");
      }
      break;
    case "ArrowDown":
      console.log('D');
      if (prevCell.exitDown) {
        const newCell = cells.filter((cell) => cell.posX === player.x && cell.posY === player.y + 1)[0];
        const showAlert = newCell.suppressAlert;
        updatePlayerLocation(newCell, prevCell);
        findOut(newCell);
      } else {
        console.log("Bonk!");
      }
      break;
    case "ArrowLeft":
      console.log('L');
      if (prevCell.exitLeft) {
        const newCell = cells.filter((cell) => cell.posX === player.x - 1 && cell.posY === player.y)[0];
        const showAlert = newCell.suppressAlert;
        updatePlayerLocation(newCell, prevCell);
        findOut(newCell);
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
      if (cells[player.i].exitTop) {
        if (player.y - 1 === wumpus.y && player.x === wumpus.x) {
          cells[wumpus.i].visit();
          drawGameboard();
          alert("You killed the Wumpus. Good Job!")
          win = true;
        } else {
          alert("You missed! The Wumpus jumps out and eats you. You died!");
        }
        gameOver = true;
        drawGameboard();
      }
      break;
    case "ArrowRight":
      console.log('Arrow R');
      if (cells[player.i].exitRight) {
        if (player.x + 1 === wumpus.x && player.y === wumpus.y) {
          cells[wumpus.i].visit();
          drawGameboard();
          alert("You killed the Wumpus. Good Job!")
          win = true;
        } else {
          alert("You missed! The Wumpus jumps out and eats you. You died!");
        }
        gameOver = true;
        drawGameboard();
      }
      break;
    case "ArrowDown":
      console.log('Arrow D');
      if (cells[player.i].exitDown) {
        if (player.y + 1 === wumpus.y && player.x === wumpus.x) {
          cells[wumpus.i].visit();
          drawGameboard();
          alert("You killed the Wumpus. Good Job!")
          win = true;
        } else {
          alert("You missed! The Wumpus jumps out and eats you. You died!");
        }
        gameOver = true;
        drawGameboard();
      }
      break;
    case "ArrowLeft":
      console.log('Arrow L');
      if (cells[player.i].exitLeft) {
        if (player.x - 1 === wumpus.x && player.y === wumpus.y) {
          cells[wumpus.i].visit();
          drawGameboard();
          alert("You killed the Wumpus. Good Job!")
          win = true;
        } else {
          alert("You missed! The Wumpus jumps out and eats you. You died!");
        }
        gameOver = true;
        drawGameboard();
      }
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
    if (cell.isPlayer) {
      arrowMode ? cellDiv.classList.add('aiming') : cellDiv.classList.add('player');
    }
    if (cell.visited || gameOver) {
      cellDiv.classList.remove('fog');
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
      if (cell.isWarning && !cell.isWumpus) {
        cellDiv.classList.add('warning');
      }
    } else {
      cellDiv.classList.add('fog');
    }
    if (gameOver) {
      cellDiv.classList.remove('fog');
      if (cell.isPlayer) {
        const deadPlayer = document.createElement('div')
        deadPlayer.classList.add('dead')
        deadPlayer.classList.add('player');
        cellDiv.appendChild(deadPlayer)
      }
    }
    cellDiv.style = `grid-column-start: ${cell.posX + 1}; grid-column-end: ${cell.posX + 2}; grid-row-start: ${cell.posY + 1}; grid-row-end: ${cell.posY + 2};`
    gameBoard.appendChild(cellDiv)
  })
};



drawGameboard();

// event handlers
const handleNewGameClick = (e) => {
  location.reload();
}

const handleKeyPress = ({ key }) => {
  if (gameOver) return;
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
}



// event listeners
document.addEventListener("keyup", handleKeyPress)

const newGameButton = document.getElementById("new-game-button");
newGameButton.addEventListener("click", handleNewGameClick);

