module.exports = {
  run: function (creep) {
    // Check if creep has energy and is working
    if (creep.memory.working && creep.store.energy == creep.carryCapacity) {
      // Switch working state to false
      creep.memory.working = false;
    }
    // If creep is harvesting and energy is full
    else if (creep.memory.working == false && creep.store.energy == 0) {
      // Switch working to true
      creep.memory.working = true;
    }

    // Check if creep should transfer energy to spawn or an extension
    if (!creep.memory.working) {
      // Find closest spawn or extension which is not full
      var spawn = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (s) => {
          return (
            s.structureType == STRUCTURE_SPAWN &&
            s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
          );
        },
      });

      var extension = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (e) => {
          return (
            e.structureType == STRUCTURE_EXTENSION &&
            e.store.getFreeCapacity(RESOURCE_ENERGY) > 0
          );
        },
      });

      var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (t) => {
          return (
            t.structureType == STRUCTURE_CONTAINER &&
            t.store.getFreeCapacity(RESOURCE_ENERGY) > 0
          );
        },
      });

      var tower = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (t) => {
          return (
            t.structureType == STRUCTURE_TOWER &&
            t.store.getFreeCapacity(RESOURCE_ENERGY) > 0
          );
        },
      });

      var storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (stor) => {
          return (
            stor.structureType == STRUCTURE_STORAGE &&
            stor.store.getFreeCapacity(RESOURCE_ENERGY) > 0
          );
        },
      });

      // If structure "to be built" exists
      if (spawn != undefined) {
        // Try and transfer energy to structure if in range
        if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          // Move towards structure
          creep.moveTo(spawn);
        }
      } else if (extension != undefined) {
        if (creep.transfer(extension, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(extension);
        }
      } else if (tower != undefined) {
        if (creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(tower);
        }
      } else if (container != undefined) {
        if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(container);
        }
      } else if (storage != undefined) {
        if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(storage);
        }
      }

      // If no buildings to be built, transfer energy to spawn
      else if (
        creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE
      ) {
        // Move towards spawn
        creep.moveTo(Game.spawns.Spawn1);
      }
    }
    // If creep is supposed to harvest energy
    else {
      // Find closest tombstone to harvest
      // var tombstone = creep.pos.findClosestByPath(FIND_TOMBSTONES, {
      //   filter: (t) => {
      //     return t.store[RESOURCE_ENERGY] > 0;
      //   },
      // });

      // Find ruins to harvest
      // var ruin = creep.pos.findClosestByPath(FIND_RUINS, {
      //   filter: (r) => {
      //     return r.store[RESOURCE_ENERGY] > 0;
      //   },
      // });
      // console.log(ruin);

      // if (tombstone) {
      //   console.log("t");
      //   if (creep.withdraw(tombstone, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      //     creep.moveTo(tombstone);
      //   }
      // } else {
      // Find closest source
      var source = creep.room.find(FIND_SOURCES_ACTIVE);
      console.log("harv: ", source[0]);
      // Harvest source if source is in range
      if (creep.harvest(source[0]) == ERR_NOT_IN_RANGE) {
        // Move towards source
        creep.moveTo(source[0]);
      }
      // }
    }
  },
};
