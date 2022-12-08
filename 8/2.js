const fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, data) {
  const forest = [];
  let highestScenicScore = 0;
  const getHeight = (rowIndex, columnIndex) =>
    Number(forest[rowIndex][columnIndex]);

  // create digestable forest
  data.split("\n").map((row) => forest.push(row.trim().split("")));
  const rowsCount = forest.length;
  const columnsCount = forest[0].length;

  // check each tree
  forest.forEach((row, rowIndex) => {
    row.forEach((height, columnIndex) => {
      height = Number(height);

      // top
      let topscore = 0;
      for (let i = rowIndex - 1; i >= 0; i--) {
        if (getHeight(i, columnIndex) < height) topscore++;
        if (getHeight(i, columnIndex) >= height) {
          topscore++;
          break;
        }
      }

      // bottom
      let bottomScore = 0;
      for (let i = rowIndex + 1; i < rowsCount; i++) {
        if (getHeight(i, columnIndex) < height) bottomScore++;
        if (getHeight(i, columnIndex) >= height) {
          bottomScore++;
          break;
        }
      }

      // left
      let leftScore = 0;
      for (let i = columnIndex - 1; i >= 0; i--) {
        if (getHeight(rowIndex, i) < height) leftScore++;
        if (getHeight(rowIndex, i) >= height) {
          leftScore++;
          break;
        }
      }

      // right
      let rightScore = 0;
      for (let i = columnIndex + 1; i < columnsCount; i++) {
        if (getHeight(rowIndex, i) < height) rightScore++;
        if (getHeight(rowIndex, i) >= height) {
          rightScore++;
          break;
        }
      }

      const treeScore = topscore * bottomScore * rightScore * leftScore;

      if (treeScore > highestScenicScore) {
        highestScenicScore = treeScore;
      }
    });
  });

  console.log("highestScenicScore", highestScenicScore);
});
