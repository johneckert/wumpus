class Player {
  constructor(cave) {
    this.arrows = 5;
    this.currentRoom = cave.entrance();

    this.senses = {
        "bat": () => "You smell something terrible.",
        "wumpus": () => "You hear a rustling.",
        "pit": () => "You feel a cold wind blowing from a nearby cavern."
    };
    this.encounters = {
        "bat": () => "Bats whisk you away.",
        "wumpus": () => "The wumpus ate you up.",
        "pit": () => "You fell into a bottomless pit."
    };
    this.actions = {
        "shoot": (targetRoom) => {
            this.arrows -= 1;
            if (targetRoom.hasHazard("wumpus")) {
                alert("YOU WIN!");
            } else {

            }
        },
        "move": (newRoom) => this.changeRoom(newRoom),
        "startleWumpus": () => {
            const prevRoom = cave.roomWithHazard("wumpus")
            cave.moveHazard()
        }
    };


  }

  changeRoom(newRoom) {
    if (newRoom.hazards.length > 0) {
        this.encounters[newRoom.hazards[0]]();
    } else {
        this.currentRoom = newRoom;
    }
  }
}