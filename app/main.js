var CURRENT_SOURCE = "current_source"
var spawn = Game.spawns.Spawn1

if (!Memory.spawns[spawn.name][CURRENT_SOURCE]) {
  Memory.spawns[spawn.name][CURRENT_SOURCE] = spawn.pos.findClosest(Game.SOURCES)
}

if (Object.keys(Game.creeps).length < 3) {
  spawn.createCreep([Game.WORK, Game.CARRY, Game.MOVE], undefined);
}

for (var i in Game.creeps) {
  var creep = Game.creeps[i]
  if(creep.energy < creep.energyCapacity) {
    var sources = spawn.pos.findClosest(Game.SOURCES);
    creep.moveTo(sources[0]);
    creep.harvest(sources[0]);
  }
  else {
    creep.moveTo(spawn);
    creep.transferEnergy(spawn)
  }
}
