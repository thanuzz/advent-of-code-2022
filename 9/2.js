const fs = require("fs");
const track = new Set(["0,0"]);
let headX = 0;
let headY = 0;
let knots = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
];

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
  for (let i = 0; i < knots.length; i++) {
    let [prevX, prevY] = i == 0 ? [headX, headY] : knots[i - 1];
    let currX = knots[i][0];
    let currY = knots[i][1];
    knots[i] = moveKnot(prevX, prevY, currX, currY);
  }

  track.add(`${knots[8][0]},${knots[8][1]}`);
};

const moveKnot = (prevX, prevY, currX, currY) => {
  const diffX = Math.abs(prevX - currX);
  const diffY = Math.abs(prevY - currY);

  // same row
  if (prevY == currY && diffX > 1) {
    currX = prevX > currX ? prevX - 1 : prevX + 1;
  }

  // different rows: 1 row diff
  if (diffY == 1) {
    // tail jumps to same row
    if (diffX > 1) {
      currY = prevY;
      currX = prevX > currX ? prevX - 1 : prevX + 1;
    }
  }

  // different rows: 2+ row diff (head moves vertically)
  if (diffY > 1) {
    // move x if needed
    if (diffX == 1) {
      currX = prevX;
    } else if (diffX > 1) {
      currX = prevX > currX ? prevX - 1 : prevX + 1;
    }
    // move y
    currY = prevY > currY ? prevY - 1 : prevY + 1;
  }
  return [currX, currY];
};
