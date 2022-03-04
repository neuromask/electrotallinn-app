const db = require("../db.js");
const utils = require("../utils/Utils.js");

// excluded Admins
const EXCLUDED_UUIDS = [
  '000',
  '2039b13f-8029-3609-ae9e-f91278a97f45',
  '5adc9182-f652-3720-b716-4dcb2421dc52',
  '72b08bb3-7575-364b-b026-0e404b469905',
  '8c91c307-4c64-3e61-8360-5071425137fd',
  '7c92c302-d9ca-329c-a605-099227aac22f',
  '17a90238-b145-318d-b0ad-cd0513f73398'
];

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
      '(group_concat(IF(s.stat="WALK_ONE_CM", s.val, NULL)) + group_concat(IF(s.stat="SPRINT_ONE_CM", s.val, NULL)) + group_concat(IF(s.stat="BOAT_ONE_CM", s.val, NULL)) + group_concat(IF(s.stat="HORSE_ONE_CM", s.val, NULL))) / 100000 AS total_km, ' +
      'group_concat(IF(s.stat="z:last_played", s.val, NULL)) AS last_played ' +
      'FROM mc_player p JOIN mc_stats s ON s.uuid = p.uuid ' +
      'WHERE p.uuid NOT IN (?) ' +
      'GROUP BY p.uuid';
    let params = [EXCLUDED_UUIDS];

    let result = await db.query(sql, params);
    return utils.convertPropsToCamelcase(result);
  }
};
