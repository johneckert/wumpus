// --------------------------------------------------------------------
// Cell class
// --------------------------------------------------------------------
// Represents a single cell in the maze grid. exitTop/Left/Right/Down
// are true when that side of the cell is open (a passage), false when
// it's a wall. posX/posY give the cell's location, with (0,0) at the
// upper-left corner of the grid.
// --------------------------------------------------------------------

class Cell {
    constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
        this.exitTop = false;
        this.exitLeft = false;
        this.exitRight = false;
        this.exitDown = false;
        this.isVisible = false;
        this.isPit = false;
        this.isNear = false;
        this.isWumpus = false;
    }
}

// --------------------------------------------------------------------
// Seeded PRNG (mulberry32) so a maze can be regenerated from a seed
// --------------------------------------------------------------------

function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// --------------------------------------------------------------------
// Direction constants (used internally while carving the maze)
// --------------------------------------------------------------------

const N = 1, S = 2, E = 4, W = 8;
const IN = 0x10;
const FRONTIER = 0x20;
const OPPOSITE = { [E]: W, [W]: E, [N]: S, [S]: N };

function addFrontier(x, y, grid, frontier) {
    if (x >= 0 && y >= 0 && y < grid.length && x < grid[y].length && grid[y][x] === 0) {
        grid[y][x] |= FRONTIER;
        frontier.push([x, y]);
    }
}

function mark(x, y, grid, frontier) {
    grid[y][x] |= IN;
    addFrontier(x - 1, y, grid, frontier);
    addFrontier(x + 1, y, grid, frontier);
    addFrontier(x, y - 1, grid, frontier);
    addFrontier(x, y + 1, grid, frontier);
}

function neighbors(x, y, grid) {
    const n = [];
    if (x > 0 && (grid[y][x - 1] & IN) !== 0) n.push([x - 1, y]);
    if (x + 1 < grid[y].length && (grid[y][x + 1] & IN) !== 0) n.push([x + 1, y]);
    if (y > 0 && (grid[y - 1][x] & IN) !== 0) n.push([x, y - 1]);
    if (y + 1 < grid.length && (grid[y + 1][x] & IN) !== 0) n.push([x, y + 1]);
    return n;
}

function direction(fx, fy, tx, ty) {
    if (fx < tx) return E;
    if (fx > tx) return W;
    if (fy < ty) return S;
    if (fy > ty) return N;
}

// --------------------------------------------------------------------
// generateMaze(width, height, seed)
//
// Runs Prim's algorithm and returns a flat array of Cell instances,
// one per grid position, with their exit flags set according to the
// generated maze. Order is row-major (y, then x), same as posX/posY.
// --------------------------------------------------------------------

function generateMaze(width, height, seed = Math.floor(Math.random() * 0xffffffff)) {
    const rng = mulberry32(seed);
    const rand = (n) => Math.floor(rng() * n);

    const grid = Array.from({ length: height }, () => Array(width).fill(0));
    const frontier = [];

    mark(rand(width), rand(height), grid, frontier);

    while (frontier.length > 0) {
        const idx = rand(frontier.length);
        const [x, y] = frontier.splice(idx, 1)[0];
        const n = neighbors(x, y, grid);
        const [nx, ny] = n[rand(n.length)];

        const dir = direction(x, y, nx, ny);
        grid[y][x] |= dir;
        grid[ny][nx] |= OPPOSITE[dir];

        mark(x, y, grid, frontier);
    }

    // Convert the bitmask grid into an array of Cell instances
    const cells = [];
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const cell = new Cell(x, y);
            const bits = grid[y][x];
            cell.posX = x;
            cell.posY = y;
            cell.exitTop = (bits & N) !== 0;
            cell.exitDown = (bits & S) !== 0;
            cell.exitRight = (bits & E) !== 0;
            cell.exitLeft = (bits & W) !== 0;
            cells.push(cell);
        }
    }

    return cells;
}
