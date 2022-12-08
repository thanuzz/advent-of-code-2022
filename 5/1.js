const fs = require("fs");

const crates = [
  ["R", "C", "H"],
  ["F", "S", "L", "H", "J", "B"],
  ["Q", "T", "J", "H", "D", "M", "R"],
  ["J", "B", "Z", "H", "R", "G", "S"],
  ["B", "C", "D", "T", "Z", "F", "P", "R"],
  ["G", "C", "H", "T"],
  ["L", "W", "P", "B", "Z", "V", "N", "S"],
  ["C", "G", "Q", "J", "R"],
  ["S", "F", "P", "H", "R", "T", "D", "L"],
];

const regex = /move (\d{1,2}) from (\d{1,2}) to (\d{1,2})/;

// PART 1
// fs.readFile("instructions.txt", "utf8", function (err, data) {
//   data.split("\n").map((instruction) => {
//     const match = instruction.match(regex);
//     const q = match[1];
//     const from = Number(match[2]) - 1;
//     const to = Number(match[3]) - 1;

//     for (let index = 0; index < q; index++) {
//       const crate = crates[from].shift();
//       crates[to].unshift(crate);
//     }
//   }, 0);

//   console.log(crates);
// });

// PART 2
fs.readFile("instructions.txt", "utf8", function (err, data) {
  data.split("\n").map((instruction) => {
    const match = instruction.match(regex);
    const q = match[1];
    const from = Number(match[2]) - 1;
    const to = Number(match[3]) - 1;

    const cratesToMove = crates[from].splice(0, q);
    crates[to] = cratesToMove.concat(crates[to]);
  }, 0);

  console.log(crates);
});
