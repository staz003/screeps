
function think(spawn) {
  var source = spawn.pos.findClosest(Game.SOURCES);
  var miners = 0;

  for (var i in Game.creeps) {
    var creep = Game.creeps[i];
    if (creep.memory.role === "miner") {
      miners += 1
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

  if (miners < 3) {
    spawn.createCreep([Game.WORK, Game.CARRY, Game.CARRY, Game.MOVE, Game.MOVE], undefined, {role: "miner"});
  }

}

module.exports = think