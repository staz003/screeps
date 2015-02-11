
function think(spawn) {
  var source = spawn.pos.findClosest(Game.SOURCES);

  if (! ("miners" in spawn.memory)) {
    spawn.memory.miners = []
  }

  if (spawn.memory.miners < 3) {
    spawn.createCreep([Game.WORK, Game.CARRY, Game.CARRY, Game.MOVE, Game.MOVE], undefined, {role: "miner"});
  }

  for (var i in Game.creeps) {
    var creep = Game.creeps[i];
    if (creep.memory.role === "miner") {
      if(creep.energy < creep.energyCapacity) {
        creep.moveTo(source);
        creep.harvest(source);
      }
      else {
        creep.moveTo(spawn);
        creep.transferEnergy(spawn);
      }
    }
  }

}

module.exports = think