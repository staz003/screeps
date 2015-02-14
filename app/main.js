var spawn = Game.spawns.Spawn1;

//var fetch = require("fetchingTest1");

//fetch(spawn)

if (Memory.method) {
  if (!Memory.ticks) Memory.ticks = 0;
  Memory.ticks += 1;

  require(Memory.method)(spawn);

  if (!spawn.spawning) {
    spawn.createCreep([Game.HEAL, Game.HEAL, Game.HEAL, Game.HEAL, Game.MOVE], undefined,
                {role: "energyeater"});
  }

  var eaters = 0;
  for (var i in Game.creeps) {
    var creep = Game.creeps[i];
    if (creep.memory.role === "work") {
      eaters += 1;
    }
  }
  var energy_collected = (spawn.energy + eaters * 850 - 6000 );

  Console.log("Got " + energy_collected + " energy in " + Memory.ticks + " tics = " + (energy_collected / Memory.ticks).toFixed(2) + " e/t"
}