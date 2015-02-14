
module.exports = function(spawn) {
  var source = spawn.pos.findClosest(Game.SOURCES);
  if (Object.keys(Game.creeps) < 2) {
    spawn.createCreep([Game.WORK, Game.CARRY, Game.CARRY, Game.MOVE, Game.MOVE]);
  }
  for (var i in Game.creeps) {
      var creep = Game.creeps[i];
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
