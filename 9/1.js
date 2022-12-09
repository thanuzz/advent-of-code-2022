const fs = require("fs");

const track = new Set(["0,0"]);
let headX = 0;
let headY = 0;
let tailX = 0;
let tailY = 0;

fs.readFile("input.txt", "utf8", (err, data) => {
  data.split("\n").map((instruction) => {
    let [direction, steps] = instruction.split(" ");
    steps = Number(steps);

    for (let i = 0; i < steps; i++) {
      if (direction == "L") headX--;
      if (direction == "R") headX++;
      if (direction == "U") headY--;
      if (direction == "D") headY++;
      tailFollow();
    }
  });

  console.log("track", track.size);
});

const tailFollow = () => {
  // same row
  if (Math.abs(headX - tailX) == 2 && tailY == headY) {
    tailX = headX > tailX ? headX - 1 : headX + 1;
  }

  // different rows: 1 row diff (head moves horizontally)
  if (Math.abs(headY - tailY) == 1) {
    // tail jumps to same row
    if (Math.abs(headX - tailX) > 1) {
      tailX = headX > tailX ? headX - 1 : headX + 1;
      tailY = headY;
    }
  }

  // different rows: 2 row diff (head moves vertically)
  if (Math.abs(headY - tailY) == 2) {
    // tail jumps a row directly under or above head
    tailX = headX;
    tailY = headY > tailY ? headY - 1 : headY + 1;
  }

  logTail();
};

const logTail = () => {
  track.add(`${tailX},${tailY}`);
};
