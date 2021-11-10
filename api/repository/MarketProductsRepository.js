const db = require("../db.js");
const utils = require("../utils/Utils.js");

module.exports = {
    findAll: async (filter) => {
        let where = '';
        for (const [key, value] of Object.entries(filter || {})) {
            where = where + (where ? ' AND ' : ' WHERE ') + `${key} = ${value}`;
        }

        let sql = 'SELECT p.id, p.user_uin AS userUin, p.name, p.description, u.first_name AS userFirstName, u.username, u.photo_url AS userPhotoUrl FROM market_products p JOIN users u ON u.uin = p.user_uin' + where;
        return await db.query(sql);
    },

    findOne: async (id) => {
        let sql = 'SELECT p.id, p.user_uin, p.name, p.description, u.first_name AS user_first_name, u.username, u.photo_url AS user_photo_url FROM market_products p JOIN users u ON u.uin = p.user_uin WHERE p.id = ?';
        let params = [id];

        let result = await db.query(sql, params);
        return result[0] ? utils.convertPropsToCamelcase(result[0]) : null;
    },
};
