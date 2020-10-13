module.exports = {
  run: function (creep) {
    var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    console.log(closestHostile);
    if (closestHostile) {
      if (creep.rangedAttack(closestHostile) == ERR_NOT_IN_RANGE) {
        creep.moveTo(closestHostile);
      }
    }
  },
};
