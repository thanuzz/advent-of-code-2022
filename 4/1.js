const fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, data) {
  // PART 1
  const totalCount1 = data.split("\n").reduce((count, sections) => {
    const pairs = sections.split(",");
    const start1 = Number(pairs[0].split("-")[0]);
    const end1 = Number(pairs[0].split("-")[1]);
    const start2 = Number(pairs[1].split("-")[0]);
    const end2 = Number(pairs[1].split("-")[1]);

    if (
      (start1 >= start2 && end1 <= end2) ||
      (start1 <= start2 && end1 >= end2)
    ) {
      return count + 1;
    }

    return count;
  }, 0);

  // PART 2
  const totalCount2 = data.split("\n").reduce((count, sections) => {
    const pairs = sections.split(",");
    const start1 = Number(pairs[0].split("-")[0]);
    const end1 = Number(pairs[0].split("-")[1]);
    const start2 = Number(pairs[1].split("-")[0]);
    const end2 = Number(pairs[1].split("-")[1]);

    if (
      (start1 >= start2 && start1 <= end2) ||
      (start1 <= start2 && end1 >= start2)
    ) {
      return count + 1;
    }

    return count;
  }, 0);
});
