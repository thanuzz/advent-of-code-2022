const fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, data) {
  const marker = [];
  const markerLength = 14;

  for (var i = 0; i < data.length; i++) {
    marker.push(data.charAt(i));

    if (marker.length > markerLength) {
      marker.shift();
      const set = new Set(marker);
      if (set.size == markerLength) console.log(i + 1);
    }
  }
});
