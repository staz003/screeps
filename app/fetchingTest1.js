
function think(spawn) {
  var source = spawn.pos.findClosest(Game.SOURCES);
  var miners = [], warriors = [], healers = [];

  for (var i in Game.creeps) {
    var creep = Game.creeps[i];
    if (creep.memory.role === "miner") {
      miners.push(creep)
      if(creep.energy < creep.energyCapacity) {
        creep.moveTo(source);
        creep.harvest(source);
      }
      else {
        creep.moveTo(spawn);
        creep.transferEnergy(spawn);
      }
    }
    else if (creep.memory.role === "warrior") {
      warriors.push(creep)
      if (creep.memory.isHealing === true) {
        if (creep.hits >= creep.hitsMax) {
          creep.memory.isHealing = false;
        }
      }
      if (creep.hits / creep.hitsMax < 0.3) {
        healer = null;
        for (var h in Game.creeps) {
          if (Game.creeps[h].memory.role === "healer") {
            healer = Game.creeps[h];
            break;
          }
        }
        if (healer) {
          creep.moveTo(healer)
          if (creep.pos.isNearTo(healer)) {
            creep.memory.isHealing = true
          }
        }
      } else {
        var enemy = creep.pos.findClosest(Game.HOSTILE_CREEPS)
        if (enemy !== null) {
          creep.moveTo(enemy)
          creep.attack(enemy)
        }
      }
    }
    else if (creep.memory.role === "healer") {
      healers.push(creep)
      targets = creep.pos.findInRange(Game.MY_CREEPS, 1)
      for (var t = 0; i < targets.length; i++) {
        if (targets[t].hits < targets[t].hitsMax) {
          creep.heal(targets[t])
        }
      }
    }
  }

  if (miners.length < 3) {
    spawn.createCreep([Game.WORK, Game.CARRY, Game.CARRY, Game.MOVE, Game.MOVE], undefined, {role: "miner"});
  }

  if (warriors.length < 2) {
    spawn.createCreep([Game.ATTACK, Game.ATTACK, Game.MOVE, Game.MOVE], undefined, {role: "warrior"});
  } else {
    if (healers.length < 1) {
      spawn.createCreep([Game.HEALER, Game.HEALER, Game.HEALER, Game.HEALER, Game.MOVE], undefined, {role: "healer"});
    }
  }




}

module.exports = think