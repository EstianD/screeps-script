module.exports = {
  run: function (tower) {
    var closestDamagedStructure = tower.pos.findClosestByRange(
      FIND_STRUCTURES,
      {
        filter: (structure) =>
          structure.structureType != "constructedWall" ||
          (structure.structureType != "container" &&
            structure.hits < structure.hitsMax),
      }
    );

    // Repair
    if (closestDamagedStructure) {
      tower.repair(closestDamagedStructure);
    }

    // Attack
    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (closestHostile) {
      tower.attack(closestHostile);
    }
  },
};
