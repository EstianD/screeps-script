module.exports = {
  run: function (creep) {
    //  Variables
    const maxControllerLvl = 10;

    // Check if creep is harvesting AND have max energy
    // Upgrade controller
    // console.log(creep.room.controller.level)
    if (creep.store.energy == creep.carryCapacity) {
      creep.memory.working = true;
    }
    // Check if creep is out of resources
    else if (creep.store.energy == 0) {
      creep.memory.working = false;
    }

    // Check if controller level is = max level defined
    // Upgrade controller
    if (
      creep.room.controller.level <= maxControllerLvl &&
      creep.memory.working
    ) {
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
    }
    // If controller level below required level creep should go harvest
    else {
      // var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

      // upgradeSource
      // var upgraderSource = Game.getObjectById("5bbcac3a9099fc012e63520e");
      var source = creep.room.find(FIND_SOURCES_ACTIVE);
      // console.log(newSource);

      if (source[1]) {
        if (creep.harvest(source[1]) == ERR_NOT_IN_RANGE) {
          // creep move to source
          creep.moveTo(source[1]);
        }
      } else {
        if (source[0].energy > 1500) {
          if (creep.harvest(source[0]) == ERR_NOT_IN_RANGE) {
            // creep move to source
            creep.moveTo(source[0]);
          }
        } else {
          console.log("there");
          creep.moveTo(Game.spawns.Spawn1);
        }
      }

      // Check if creep is in range of source
    }
  },
};
