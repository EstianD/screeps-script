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

    // const targets = creep.room.find(FIND_STRUCTURES, {
    //   filter: (object) =>
    //     object.structureType == STRUCTURE_CONTAINER &&
    //     object.store[RESOURCE_ENERGY] < object.store.getCapacity(),
    // });

    // Check if creep should transfer energy to spawn or an extension
    if (!creep.memory.working) {
      // Find closest spawn or extension which is not full
      var structure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        // Second arg takes a object with a filter property
        filter: (s) => {
          return (
            (s.structureType == STRUCTURE_EXTENSION ||
              s.structureType == STRUCTURE_SPAWN ||
              s.structureType == STRUCTURE_CONTAINER ||
              s.structureType == STRUCTURE_TOWER) &&
            s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
          );
        },
      });
      // console.log(structure);

      // If no structure need energy
      // Store energy in container
      // if (structures) {
      // var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      //   filter: { structureType: STRUCTURE_CONTAINER },
      // });
      // If container exist
      // if (container) {
      //   if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      //     // Move towards structure
      //     creep.moveTo(container);
      //   }
      // }
      // }

      // console.log(structures);
      // If structure "to be built" exists
      if (structure != undefined) {
        // Try and transfer energy to structure if in range
        if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          // Move towards structure
          creep.moveTo(structure);
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
      // Find closest source
      var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

      // Harvest source if source is in range
      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        // Move towards source
        creep.moveTo(source);
      }
    }
  },
};
