module.exports = {
  run: function (creep) {
    var source = Game.getObjectById("5bbcabfe9099fc012e634a2b");
    var source2 = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
    console.log(source2);
    console.log("!!!", creep.harvest(source2));
    if (creep.harvest(source2) == ERR_NOT_IN_RANGE) {
      creep.moveTo(new RoomPosition(47, 21, "W16N17"));
    }
  },
};
