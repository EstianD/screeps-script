// Import modules
var roleHarvester = require("role.harvester");
var roleUpgrader = require("role.upgrader");
var roleBuilder = require("role.builder");
var roleRepairer = require("role.repairer");
var roleTower = require("role.tower");

module.exports.loop = () => {
  // Clear memory of dead creeps
  for (let name in Memory.creeps) {
    if (Game.creeps[name] == undefined) {
      delete Memory.creeps[name];
    }
  }

  // console.log(Game.spawns.Spawn1.energy);
  // Creep spawn section
  // Variables
  const maxHarvesters = 5;
  const maxUpgraders = 4;
  const maxBuilders = 3;
  const maxRepairers = 1;

  // Check creep requirements
  let harvesters = _.sum(Game.creeps, (c) => c.memory.role == "harvester");
  let upgraders = _.sum(Game.creeps, (c) => c.memory.role == "upgrader");
  let builders = _.sum(Game.creeps, (c) => c.memory.role == "builder");
  let repairers = _.sum(Game.creeps, (c) => c.memory.role == "repairer");

  if (harvesters < maxHarvesters) {
    // Create harvester
    Game.spawns.Spawn1.createCreep(
      [WORK, WORK, MOVE, CARRY, CARRY],
      undefined,
      {
        role: "harvester",
        working: false,
      }
    );
  } else if (upgraders < maxUpgraders) {
    Game.spawns.Spawn1.createCreep(
      [WORK, WORK, MOVE, MOVE, CARRY, CARRY],
      undefined,
      {
        role: "upgrader",
        working: false,
      }
    );
  } else if (builders < maxBuilders) {
    Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, MOVE, CARRY], undefined, {
      role: "builder",
      working: false,
    });
  } else if (repairers < maxRepairers) {
    Game.spawns.Spawn1.createCreep([WORK, WORK, MOVE, MOVE, CARRY], undefined, {
      role: "repairer",
      working: false,
    });
  }

  // TOWER
  var tower = Game.getObjectById("5f71977214c95f83d270817b");
  if (tower) {
    roleTower.run(tower);
  }

  for (let name in Game.creeps) {
    //   Get creep object
    var creep = Game.creeps[name];

    creep.say(creep.memory.role[0]);
    // Check creep role
    //  Harvester
    if (creep.memory.role == "harvester") {
      roleHarvester.run(creep);
    } //  Builder
    else if (creep.memory.role == "builder") {
      roleBuilder.run(creep);
    } else if (creep.memory.role == "upgrader") {
      roleUpgrader.run(creep);
    } else if (creep.memory.role == "repairer") {
      roleRepairer.run(creep);
    }
  }
};
