
function report(s) {
  console.log(s);
}

function count(value) {
  return function (previousValue, currentValue, index, array) {
    //report("previousValue = " + previousValue + ", currentValue = " + currentValue);
    return previousValue + (currentValue === value ? 1 : 0)
  }
}

function pad(d, n) {
  var l = String(d).length
  for (var i = 0; i < (n - l); i++) d = d + " "
  return d
}

function compareNumbers(a, b) {
  return a - b;
}

tests = [
  ["work", "carry", "move"],
  ["work", "carry", "move", "move"],
  ["work", "carry", "move", "move", "move"],
  ["work", "work", "carry", "move"],
  ["work", "work", "work", "carry", "move"],
  ["work", "carry", "carry", "move"],
  ["work", "carry", "carry", "carry", "move"],
  ["work", "work", "carry", "carry", "move"],
  ["work", "work", "carry", "move", "move"],
  ["work", "carry", "carry", "move", "move"]
]
var going, gather, comeback;
var col = 10
var life_time = 1800


report (pad("Distance", col) + pad("Going", col) + pad("Gather", col) + pad("Come back", col) +
      pad("Roundtrip", col) + pad("Capacity", col) +"Energy / Tic" +
      pad("Cost", col) + pad("Trips", col) + pad("Tot Carry", col) + pad("Roi", col));

for (var dist = 1; dist <= 50; dist++) {
  var rows = [];

  for (var t = 0; t < tests.length; t++) {
    stats = tests[t]

    move = stats.reduce(count("move"), 0)
    carry = stats.reduce(count("carry"), 0)
    work = stats.reduce(count("work"), 0)

    cost = move*50 + carry*50 + work*20

    going_time = Math.ceil(dist / Math.min(move / work, 1))
    gather_speed = work * 2
    capacity = carry * 50
    gather_time = Math.ceil(capacity / gather_speed)
    comeback_time = Math.ceil(dist * Math.ceil(1 / Math.min(move / (carry + work), 1)))

    roundtrip_time = going_time + gather_time + comeback_time

    en_per_tic = capacity / roundtrip_time

    total_roundtrips = Math.floor(life_time / roundtrip_time)
    total_carried = capacity * total_roundtrips

    roi = total_carried / cost * 100

    rows.push([dist, going_time, gather_time, comeback_time,
      roundtrip_time, capacity, (en_per_tic).toFixed(2) + " e/t",
      cost, total_roundtrips, total_carried, (roi).toFixed(2) + "%",
      (en_per_tic * roi).toFixed(2),
      "[" + stats.join(",") + "]"])
  }

  rows.sort(function(a, b) { return parseFloat(b[11]) - parseFloat(a[11]) });


  for (var i = 0; i < rows.length; i++) {
    report(rows[i].map(function(e) { return pad(e, col)}).join(""));
  }
  report("  >> Best = " + rows[0][12])
  // report(pad(dist, col) + pad(going_time, col) + pad(gather_time, col) + pad(comeback_time, col) +
  //    pad(roundtrip_time, col) + pad(capacity, col) + pad((capacity / roundtrip_time).toFixed(2) + " e/t", col) + "[" + stats.join(",") + "]");
}