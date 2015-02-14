
// not efficient better with miner and carriers
// team = Got 3020 energy in 500 tics = 6.04 e/t
// team3 = Got 3290 energy in 500 tics = 6.58 e/t
// team3.2 = Got 4490 energy in 500 tics = 8.98 e/t
// indies = Got 1060 energy in 500 tics = 2.12 e/t

module.exports = function(spawn) {
  var source = spawn.pos.findClosest(Game.SOURCES);
  if (Object.keys(Game.creeps).length < 2) {
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
