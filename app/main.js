var CURRENT_SOURCE = "current_source"
var spawn = Game.spawns.Spawn1

if (! CURRENT_SOURCE in spawn.memory) {
  spawn.memory[CURRENT_SOURCE] = spawn.pos.findClosest(Game.SOURCES)
}

if (Object.keys(Game.creeps).length < 3) {
  spawn.createCreep([Game.WORK, Game.CARRY, Game.MOVE], undefined);
}

for (var i in Game.creeps) {
  var creep = Game.creeps[i];
  if(creep.energy < creep.energyCapacity) {
    var source = spawn.pos.findClosest(Game.SOURCES);
    creep.moveTo(source);
    creep.harvest(source);
  }
  else {
    creep.moveTo(spawn);
    creep.transferEnergy(spawn);
  }
}
