// Import modules
var roleHarvester = require("role.harvester");
var roleUpgrader = require("role.upgrader");
var roleBuilder = require("role.builder");
var roleRepairer = require("role.repairer");
var roleTower = require("role.tower");
var roleTransferer = require("role.transferer");
var roleWarrior = require("role.warrior");
var roleAdventurer = require("role.adventurer");
var roleDefRepairer = require("role.defenseRepairer");

module.exports.loop = () => {
  // Clear memory of dead creeps
  for (let name in Memory.creeps) {
    if (Game.creeps[name] == undefined) {
      delete Memory.creeps[name];
    }
  }

  // Safemode
  const roomController = Game.rooms["W12N27"].controller;
  // Find hostiles
  var targets = roomController.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
  if (targets) {
    if (roomController.safeModeAvailable) {
      console.log("activate safemode");
      roomController.activateSafeMode();
    }
  }

  // Creep spawn section
  // Variables
  const maxHarvesters = 3;
  const maxUpgraders = 3; //3
  const maxBuilders = 3; //2
  const maxRepairers = 2; //1
  const maxTransferers = 1;
  const maxWarriors = 0;
  const maxDefRepairers = 1;

  // Check creep requirements
  let harvesters = _.sum(Game.creeps, (c) => c.memory.role == "harvester");
  let upgraders = _.sum(Game.creeps, (c) => c.memory.role == "upgrader");
  let builders = _.sum(Game.creeps, (c) => c.memory.role == "builder");
  let repairers = _.sum(Game.creeps, (c) => c.memory.role == "repairer");
  let transferers = _.sum(Game.creeps, (c) => c.memory.role == "transferer");
  let warriors = _.sum(Game.creeps, (c) => c.memory.role == "warrior");
  let defRepairers = _.sum(Game.creeps, (c) => c.memory.role == "defrepairer");

  // Check for trasferers
  if (transferers < maxTransferers) {
    Game.spawns.Spawn1.createCreep(
      [MOVE, MOVE, CARRY, CARRY, CARRY],
      undefined,
      {
        role: "transferer",
        working: false,
      }
    );
  }

  if (harvesters < maxHarvesters) {
    // Create harvester
    Game.spawns.Spawn1.createCreep(
      [
        WORK,
        WORK,
        MOVE,
        MOVE,
        CARRY,
        CARRY,
        CARRY,
        CARRY,
        CARRY,
        CARRY,
        CARRY,
        CARRY,
        CARRY,
        CARRY,
      ], //MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY
      undefined,
      {
        role: "harvester",
        working: false,
      }
    );
  } else if (upgraders < maxUpgraders) {
    Game.spawns.Spawn1.createCreep(
      [
        WORK,
        WORK,
        WORK,
        WORK,
        MOVE,
        MOVE,
        MOVE,
        CARRY,
        CARRY,
        CARRY,
        CARRY,
        CARRY,
        CARRY,
        CARRY,
        CARRY,
        CARRY,
        CARRY,
      ],
      undefined,
      {
        role: "upgrader",
        working: false,
      }
    );
  } else if (builders < maxBuilders) {
    Game.spawns.Spawn1.createCreep(
      [
        WORK,
        WORK,
        WORK,
        MOVE,
        MOVE,
        CARRY,
        CARRY,
        CARRY,
        CARRY,
        CARRY,
        CARRY,
        CARRY,
      ],
      undefined,
      {
        role: "builder",
        working: false,
      }
    );
  } else if (repairers < maxRepairers) {
    Game.spawns.Spawn1.createCreep(
      [WORK, WORK, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY],
      undefined,
      {
        role: "repairer",
        working: false,
      }
    );
  } else if (defRepairers < maxDefRepairers) {
    Game.spawns.Spawn1.createCreep(
      [WORK, WORK, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY],
      undefined,
      {
        role: "defrepairer",
        working: false,
      }
    );
  }

  // TOWER
  var tower_1 = Game.getObjectById("5f81ceda12dde312bf5078d9");
  var tower_2 = Game.getObjectById("5f872f49c8ae37cc271e2542");
  // var tower_2 = Game.getObjectById("5f7c66faf210d00fd1e0332f");
  if (tower_1) {
    roleTower.run(tower_1);
  }

  if (tower_2) {
    roleTower.run(tower_2);
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
    } else if (creep.memory.role == "defrepairer") {
      roleDefRepairer.run(creep);
    } else if (creep.memory.role == "transferer") {
      roleTransferer.run(creep);
    } else if (creep.memory.role == "warrior") {
      roleWarrior.run(creep);
    } else if (creep.memory.role == "adventurer") {
      roleAdventurer.run(creep);
    }
  }
};
