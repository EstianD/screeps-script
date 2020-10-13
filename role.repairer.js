var roleBuilder = require("./role.builder");

module.exports = {
  run: function (creep) {
    //   Check if creep has no energy and is working
    // Go harvest
    // Check if creep has max energy
    if (creep.store.energy == 0) {
      creep.memory.working = false;
    }
    // Go repair
    else if (creep.store.energy == creep.carryCapacity) {
      creep.memory.working = true;
    }

    //  Check wirking state of creep
    if (creep.memory.working) {
      var closestDamagedStructure = creep.pos.findClosestByPath(
        FIND_STRUCTURES,
        {
          filter: function (structure) {
            //  console.log(structure.structureType);
            return (
              structure.structureType != "constructedWall" &&
              structure.hits < structure.hitsMax
            );
          },
        }
      );
      // console.log(closestDamagedStructure);
      // IF structure needing repair exists
      // Repair structure
      // If no structures need repair
      // Become builder

      if (closestDamagedStructure && creep.memory.working) {
        if (creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE) {
          creep.moveTo(closestDamagedStructure);
        }
      } else if (!closestDamagedStructure && creep.memory.working) {
        roleBuilder.run(creep);
      }
      // If energy == 0
    } else {
      //  Go harvest energy
      // var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
      // if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
      //   creep.moveTo(source);
      // }
      var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (c) =>
          c.structureType == STRUCTURE_CONTAINER &&
          c.store[RESOURCE_ENERGY] > 0,
      });
      if (closestDamagedStructure && container) {
        // Go to storage
        if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(container);
        }
      } else {
        // Find source to harvest
        var source = creep.room.find(FIND_SOURCES_ACTIVE);

        if (source[1]) {
          if (creep.harvest(source[1]) == ERR_NOT_IN_RANGE) {
            // creep move to source
            creep.moveTo(source[1]);
          }
        }
      }
    }
  },
};
