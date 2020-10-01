var roleUpgrader = require("./role.upgrader");

module.exports = {
  run: function (creep) {
    // Check working state
    // true = working (building)
    // false = !working (not building)

    // If not building and has no energy = go harvest
    // Set working state false
    if (creep.memory.working && creep.store.energy == 0) {
      creep.memory.working = false;
    }
    // If not working and harvest capacity is full = build
    else if (
      !creep.memory.working &&
      creep.store.energy == creep.carryCapacity
    ) {
      creep.memory.working = true;
    }

    // Find structure to build
    var constructionSite = creep.pos.findClosestByRange(
      FIND_CONSTRUCTION_SITES
    );
    // If construction site
    // Go build
    if (constructionSite && creep.memory.working) {
      // console.log("here");
      //  Build structure
      if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
        // Move to structure
        creep.moveTo(constructionSite);
      }
    }
    // Go upgrade
    else if (!constructionSite) {
      roleUpgrader.run(creep);
    }
    // Go harvest
    else {
      // If building, creep can get energy from storage
      // If not building(upgrading), creep should harvest at source
      // Get storage
      var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (c) =>
          c.structureType == STRUCTURE_CONTAINER &&
          c.store[RESOURCE_ENERGY] > 0,
      });
      if (constructionSite && container) {
        // Go to storage
        if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(container);
        }
      } else {
        // Find source to harvest
        var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
          creep.moveTo(source);
        }
      }
    }
  },
};
