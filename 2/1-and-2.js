const fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, data) {
  // PART 1
  const totalScorePart1 = data.split("\n").reduce((prev, curr) => {
    const input = curr.split(" ");
    const them = input[0];
    const me = normalizeHand[input[1]];
    return prev + getPointsForFight(them, me) + handScore[me];
  }, 0);
  console.log("totalScorePart1", totalScorePart1);

  // PART 2
  const totalScorePart2 = data.split("\n").reduce((prev, curr) => {
    const input = curr.split(" ");
    const them = input[0];
    const me = getHandByResult(them, input[1]);
    return prev + getPointsForFight(them, me) + handScore[me];
  }, 0);
  console.log("totalScorePart2", totalScorePart2);
});

const normalizeHand = {
  X: "A",
  Y: "B",
  Z: "C",
};

const handScore = {
  A: 1,
  B: 2,
  C: 3,
};

const getPointsForFight = (them, me) => {
  // draw
  if (them == me) return 3;

  // wins
  if (them == "A" && me == "B") return 6;
  if (them == "B" && me == "C") return 6;
  if (them == "C" && me == "A") return 6;

  // looses
  if (them == "A" && me == "C") return 0;
  if (them == "B" && me == "A") return 0;
  if (them == "C" && me == "B") return 0;
};

// helper method for part 2
const getHandByResult = (them, result) => {
  //draw
  if (result == "Y") return them;

  // wins
  if (them == "A" && result == "Z") return "B";
  if (them == "B" && result == "Z") return "C";
  if (them == "C" && result == "Z") return "A";

  // looses
  if (them == "A" && result == "X") return "C";
  if (them == "B" && result == "X") return "A";
  if (them == "C" && result == "X") return "B";
};
