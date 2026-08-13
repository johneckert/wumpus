class Room {
  constructor(n) {
    this.id = n; // int (1-20)
    this.hazards = []; // array of strings
    this.neighbors = []; // array of Rooms




  }

  get id() {
    return this.id;
  }

  get hazards() {
    return this.hazards;
  }

  get neighbors() {
    return this.neighbors;
  }

  addHazard(h) {
    this.hazards.push(h);
  }

  addNeighbor(room) {
    this.neighbors.push(room);
  }

  getRandomNeighbor() {
    const randomIndex = Math.floor(Math.random() * this.neighbors.length);
    return this.neighbors[randomIndex]
  }

  removeHazard(h) {
    const i = this.hazards.indexOf(h)
    if (i > -1) { 
      this.hazards.splice(i, 1); 
    }
  }

  hasHazard(h) {
    return this.hazards.includes(h)
  }

  isEmpty() {
    return this.hazard.length === 0 ? true : false;
  }

  isSafe() {
    let safeNeighbors = true;
    this.neighbors.forEach((n) => {
      safeNeighbors = n.hazards ? false : safeNeighbors;
    })
    return safeNeighbors && this.isEmpty ? true : false;
  }
}