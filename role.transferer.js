module.exports = {
  run: function (creep) {
    // Check if creep has energy and is working
    // if (!creep.memory.working && creep.store.energy == creep.carryCapacity) {
    //   // Switch working state to false
    //   creep.memory.working = true;
    // }
    // // If creep is harvesting and energy is full
    // else if (creep.memory.working == false && creep.store.energy == 0) {
    //   // Switch working to true
    //   creep.memory.working = true;
    // }

    if (creep.store.energy == creep.carryCapacity) {
      creep.memory.working = true;
    } else if (creep.store.energy == 0) {
      creep.memory.working = false;
    }

    // // Check if creep should transfer energy to spawn or an extension
    if (creep.memory.working) {
      // Find closest spawn or extension which is not full
      var structure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        // Second arg takes a object with a filter property
        filter: (s) => {
          return (
            (s.structureType == STRUCTURE_EXTENSION ||
              s.structureType == STRUCTURE_SPAWN) &&
            s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
          );
        },
      });

      console.log(structure);

      // If structure "to be built" exists
      if (structure != undefined) {
        // Try and transfer energy to structure if in range
        if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          // Move towards structure
          creep.moveTo(structure);
        }
      }
    }
    // If creep is supposed to harvest energy
    else {
      var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (s) =>
          s.structureType == STRUCTURE_CONTAINER && s.store.energy > 0,
      });

      var storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (s) =>
          s.structureType == STRUCTURE_STORAGE && s.store.energy > 0,
      });

      // Find dropped resources
      const droppedResources = creep.pos.findClosestByRange(
        FIND_DROPPED_RESOURCES
      );

      // console.log(container);

      if (container) {
        if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(container);
        }
      } else if (storage) {
        if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(storage);
        }
      } else {
        var tombstone = creep.pos.findClosestByPath(FIND_TOMBSTONES, {
          filter: (t) => {
            return t.store[RESOURCE_ENERGY] > 0;
          },
        });
        if (tombstone) {
          if (creep.withdraw(tombstone, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(tombstone);
          }
        } else if (creep.pickup(droppedResources) == ERR_NOT_IN_RANGE) {
          creep.moveTo(droppedResources);
        } else {
          var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

          // Harvest source if source is in range
          if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            // Move towards source
            creep.moveTo(source);
          }
        }
      }

      // Find closest tombstone to harvest
      // var tombstone = creep.pos.findClosestByPath(FIND_TOMBSTONES, {
      //   filter: (t) => {
      //     return t.store[RESOURCE_ENERGY] > 0;
      //   },
      // });

      // if (tombstone) {
      // if (creep.harvest(tombstone) == ERR_NOT_IN_RANGE) {
      //   creep.moveTo(tombstone);
      // }
      // } else {
      //   // Find closest source
      // var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

      // // Harvest source if source is in range
      // if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
      //   // Move towards source
      //   creep.moveTo(source);
      // }
      // }
    }
  },
};
