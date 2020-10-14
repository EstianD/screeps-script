module.exports = {
  run: function (tower) {
    // var closestDamagedStructure = tower.pos.findClosestByRange(
    //   FIND_STRUCTURES,
    //   {
    //     filter: (structure) =>
    //       structure.structureType != "constructedWall" ||
    //       (structure.structureType != "container" &&
    //         structure.hits < structure.hitsMax),
    //   }
    // );

    // // console.log("d: ", closestDamagedStructure);

    // // Repair
    // if (closestDamagedStructure) {
    //   tower.repair(closestDamagedStructure);
    // }

    console.log(tower);
    // Attack
    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    console.log(closestHostile);
    if (closestHostile) {
      tower.attack(closestHostile);
    }
  },
};
