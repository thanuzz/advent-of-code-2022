const fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, data) {
  // PART 1
  const totalPrioCount1 = data.split("\n").reduce((prioCount, items) => {
    const parts = splitHalf(items);
    const doubleItem = (parts[0].match(new RegExp("[" + parts[1] + "]")) ||
      [])[0];
    const prio = all.indexOf(doubleItem) + 1;
    return prioCount + prio;
  }, 0);
  console.log("totalPrioCount1", totalPrioCount1);

  // PART 2
  const elfGroups = groupByN(3, data.split("\n"));
  const totalPrioCount2 = elfGroups.reduce((prioCount, group) => {
    const doubleItem = findUniqueInThree(...group);
    const prio = all.indexOf(doubleItem) + 1;
    return prioCount + prio;
  }, 0);
  console.log("totalPrioCount2", totalPrioCount2);
});

const alphabet = "abcdefghijklmnopqrstuvwxyz";
const alphabetUpper = alphabet.toUpperCase();
const all = alphabet + alphabetUpper;

const splitHalf = (items) => {
  const half = items.length / 2;
  const firstHalf = items.slice(0, half);
  const secondHalf = items.slice(half);
  return [firstHalf, secondHalf];
};

const groupByN = (n, data) => {
  let result = [];
  for (let i = 0; i < data.length; i += n) result.push(data.slice(i, i + n));
  return result;
};

const findUniqueInThree = (one, two, three) => {
  return one.split("").find((item) => {
    return two.split("").includes(item) && three.split("").includes(item);
  });
};
