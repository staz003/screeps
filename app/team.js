
module.exports = function(spawn) {
  var source = spawn.pos.findClosest(Game.SOURCES);

  if (Object.keys(Game.creeps).length === 0) {
    spawn.createCreep([Game.WORK, Game.WORK, Game.WORK, Game.WORK, Game.MOVE], undefined, {role: "work"});
  } else if (Object.keys(Game.creeps).length === 1) {
    //spawn.createCreep([Game.CARRY, Game.CARRY, Game.CARRY, Game.CARRY, Game.MOVE], undefined, {role: "carry"});
  }

  for (var i in Game.creeps) {
    var creep = Game.creeps[i];
    if (creep.memory.role === "work") {
        creep.moveTo(source);
        creep.harvest(source);
    }
  }
}
