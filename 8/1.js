const fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, data) {
  const forest = [];
  let visibleCount = 0;

  // create digestable forest
  data.split("\n").map((row) => forest.push(row.trim().split("")));
  const rowsCount = forest.length;
  const columnsCount = forest[0].length;

  // check each tree
  forest.forEach((row, rowIndex) => {
    // skip edges
    row.forEach((height, columnIndex) => {
      height = Number(height);
      if (
        rowIndex == 0 ||
        rowIndex == rowsCount - 1 ||
        columnIndex == 0 ||
        columnIndex == columnsCount - 1
      ) {
        visibleCount++;
        return;
      }

      // top
      let topVisible = true;
      for (let i = 0; i < rowIndex; i++) {
        if (forest[i][columnIndex] >= height) {
          topVisible = false;
          break;
        }
      }

      // bottom
      let bottomVisible = true;
      for (let i = rowIndex + 1; i < rowsCount; i++) {
        if (forest[i][columnIndex] >= height) {
          bottomVisible = false;
          break;
        }
      }

      // left
      let leftVisible = true;
      for (let i = 0; i < columnIndex; i++) {
        if (forest[rowIndex][i] >= height) {
          leftVisible = false;
          break;
        }
      }

      // right
      let rightVisible = true;
      for (let i = columnIndex + 1; i < columnsCount; i++) {
        if (forest[rowIndex][i] >= height) {
          rightVisible = false;
          break;
        }
      }

      if (topVisible || bottomVisible || leftVisible || rightVisible)
        visibleCount++;
    });
  });

  console.log("visibleCount", visibleCount);
});
