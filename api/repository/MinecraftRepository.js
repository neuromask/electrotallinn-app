const db = require("../db.js");
const utils = require("../utils/Utils.js");

module.exports = {
  getStatistics: async () => {
    let sql = 'SELECT ' +
      'p.name, ' +
      'group_concat(IF(s.stat="PLAY_ONE_MINUTE", s.val, NULL)) AS played, ' +
      'group_concat(IF(s.stat="z:mined", s.val, NULL)) AS mined, ' +
      'group_concat(IF(s.stat="z:placed", s.val, NULL)) AS placed, ' +
      'group_concat(IF(s.stat="MOB_KILLS", s.val, NULL)) + group_concat(if(s.stat="PLAYER_KILLS", s.val, NULL)) AS kills, ' +
      'group_concat(IF(s.stat="DEATHS", s.val, NULL)) AS deaths, ' +
      'group_concat(IF(s.stat="DAMAGE_TAKEN", s.val, NULL)) AS damage_taken, ' +
      'group_concat(IF(s.stat="DAMAGE_DEALT", s.val, NULL)) AS damage_dealt, ' +
      'group_concat(IF(s.stat="WALK_ONE_CM", s.val, NULL)) / 100000 AS walk_km, ' +
      'group_concat(IF(s.stat="SPRINT_ONE_CM", s.val, NULL)) / 100000 AS sprint_km, ' +
      'group_concat(IF(s.stat="BOAT_ONE_CM", s.val, NULL)) / 100000 AS boat_km, ' +
      'group_concat(IF(s.stat="HORSE_ONE_CM", s.val, NULL)) / 100000 AS horse_km, ' +
      'group_concat(IF(s.stat="z:last_played", s.val, NULL)) AS last_played ' +
      'FROM mc_player p JOIN mc_stats s ON s.uuid = p.uuid ' +
      'GROUP BY p.uuid';

    let result = await db.query(sql);
    return utils.convertPropsToCamelcase(result);
  }
};
