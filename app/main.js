var spawn = Game.spawns.Spawn1;

//var fetch = require("fetchingTest1");

//fetch(spawn)

if (Memory.method) {
  if (!Memory.ticks) Memory.ticks = 0;
  Memory.ticks += 1;

  if (!spawn.spawning) {
    spawn.createCreep([Game.HEAL, Game.HEAL, Game.HEAL, Game.HEAL, Game.MOVE], undefined, {role: "energyeater"});
  }

  require(Memory.method)(spawn);

  var eaters = 0;
  for (var i in Game.creeps) {
    var creep = Game.creeps[i];
    if (creep.memory.role === "energyeater") {
      eaters += 1;
      creep.move(Game.TOP_LEFT);
    }
  }
  var energy_collected = (spawn.energy + (eaters * 850) - 6000 );

  console.log("Got " + energy_collected + " energy in " + Memory.ticks + " tics = " + (energy_collected / Memory.ticks).toFixed(2) + " e/t");
}

// team = [21:17:37] Got 3020 energy in 500 tics = 6.04 e/t
// indies = [21:22:23]Got 1060 energy in 500 tics = 2.12 e/t
