const fs = require("fs");
var _ = require("lodash");

fs.readFile("input.txt", "utf8", (err, data) => {
  const tree = buildTree(data);

  // PART 1
  const maxSize100000Dirs = _(tree)
    .filter((v) => v <= 100000)
    .sum();
  console.log(maxSize100000Dirs);

  // PART 2
  const spaceToGain = 30000000 - (70000000 - 44125990);
  let dirSpaceToDelete;

  Object.values(tree).reduce((smallestDiff, dirSize) => {
    const diff = dirSize - spaceToGain;
    if (diff >= 0 && diff < smallestDiff) {
      dirSpaceToDelete = dirSize;
      return diff;
    }
    return smallestDiff;
  }, 9999999999);

  console.log(dirSpaceToDelete);
});

function buildTree(data) {
  const tree = { "/": 0 };
  let pointer = ["/"];

  const getPath = (path) => {
    return path.join("/").replace("//", "/");
  };

  data.split("\n").forEach((line) => {
    // ignore list
    if (line.startsWith("$ ls")) {
      return;
    }

    // navigate
    else if (line.startsWith("$ cd")) {
      const dir = line.replace("$ cd ", "");
      if (dir == "/") {
        pointer = ["/"];
      } else if (dir == "..") {
        pointer.pop();
      } else {
        pointer.push(dir);
      }
    }

    //  dir
    else if (line.startsWith("dir ")) {
      const dirName = line.replace("dir ", "");
      const path = getPath([...pointer, dirName]);
      tree[path] = 0;
    }

    //  file
    else {
      const size = Number(line.split(" ")[0]);
      pointer.forEach((_, index) => {
        const path = getPath(pointer.slice(0, index + 1));
        tree[path] = (tree[path] || 0) + size;
      });
    }
  });

  return tree;
}
