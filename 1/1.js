const fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, data) {
  const elfs = data.split("\n\n");
  const mostCalories = elfs.reduce((maxCalories, group) => {
    const totalCalories = group
      .split("\n")
      .reduce((prev, curr) => prev + Number(curr), 0);
    return Math.max(totalCalories, maxCalories);
  }, 0);

  console.log(mostCalories);
});
