class Cave {
  constructor () {
    this.rooms = []; // array of Rooms
    this.dodecahedron = [[1, 2], [2, 10], [10, 11], [11, 8], [8, 1], [1, 5], [2, 3], [9, 10], [20, 11], [7, 8], [5, 4], [4, 3], [3, 12], [12, 9], [9, 19], [19, 20], [20, 17], [17, 7], [7, 6], [6, 5], [4, 14], [12, 13], [18, 19], [16, 17], [15, 6], [14, 13], [13, 18], [18, 16], [16, 15], [15, 14]]
    this.entrance;

    for (let i = 0; i <= 19; i++) {
      this.rooms.push(Room.new(i + 1));
    }

    this.dodecahedron.forEach(([ a, b ]) => {
      this.rooms[a].addNeighbor(this.rooms[b]);
      this.rooms[b].addNeighbor(this.rooms[a]);
    })
  }

  get entrance() {
    if (!this.entrance) {
        this.entrance = this.rooms.find((room) => room.isSafe());
    }

    return this.entrance;
  }

  getRoom(n) {
    this.rooms.find((room) => room.id === n);
  }

  randomRoom() {
    const roomIndex = Math.floor(Math.random() * this.rooms.length);
    return this.rooms[randomIndex];
  }

  addHazard(hazard, count) {
    for (let i = 0; i < count; i++) {
      let room = this.randomRoom();
      while (room.hasHazard(hazard)) {
        room = this.randomRoom();
      }
      room.addHazard(hazard);
    }
  }

  moveHazard(hazard, fromRoom, toRoom) {
    fromRoom.removeHazard(hazard);
    toRoom.addHazard(hazard);
  }

  roomWithHazard(hazard) {
    this.rooms.find((room) => room.hazards.includes(hazard));
  }
}