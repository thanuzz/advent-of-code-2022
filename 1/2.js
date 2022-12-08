const fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, data) {
  const totalCaloriesPerElf = data
    .split("\n\n")
    .map((elfsCalories) =>
      elfsCalories.split("\n").reduce((prev, curr) => prev + Number(curr), 0)
    )
    .sort((a, b) => b - a);

  const totalCaloriesForTop1Elf = totalCaloriesPerElf.shift();
  const totalCaloriesForTop3Elves = totalCaloriesPerElf
    .splice(0, 3)
    .reduce((prev, cur) => prev + cur, 0);
});
