

if (!Game.spawns) {
  console.log(Game.rooms)
}
if (Object.keys(Game.creeps).length === 0) {
  Game.spawns.Spawn1.createCreep([Game.WORK, Game.CARRY, Game.MOVE], 'Worker1');
}

for (var i in Game.creeps) {
  var creep = Game.creeps[i]
  if(creep.energy < creep.energyCapacity) {
    var sources = creep.room.find(Game.SOURCES);
    creep.moveTo(sources[0]);
    creep.harvest(sources[0]);
  }
  else {
    creep.moveTo(Game.spawns.Spawn1);
    creep.transferEnergy(Game.spawns.Spawn1)
  }
}
