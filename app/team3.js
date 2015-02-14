
module.exports = function(spawn) {
  var source = spawn.pos.findClosest(Game.SOURCES);

  if (Object.keys(Game.creeps).length === 0 || Object.keys(Game.creeps).length === 2) {
    spawn.createCreep([Game.WORK, Game.WORK, Game.WORK, Game.WORK, Game.MOVE], undefined, {role: "work"});
  } else if (Object.keys(Game.creeps).length === 1) {
    spawn.createCreep([Game.CARRY, Game.CARRY, Game.CARRY, Game.CARRY, Game.MOVE], undefined,
      {role: "carry", teamate: Object.keys(Game.creeps)[0]});
  }

  for (var i in Game.creeps) {
    var creep = Game.creeps[i];
    if (creep.memory.role === "work") {
        creep.moveTo(source);
        creep.harvest(source);
    } else if (creep.memory.role === "carry") {
       if(creep.energy < creep.energyCapacity) {
         creep.moveTo(Game.creeps[creep.memory.teamate]);
         creep.pickup(creep.pos.findClosest(Game.DROPPED_ENERGY))
       } else {
         creep.moveTo(spawn);
         creep.transferEnergy(spawn);
       }
    }
  }
}
