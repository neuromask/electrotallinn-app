const db = require("../db.js");
const utils = require("../utils/Utils.js");

module.exports = {
    findByLocationId: async (locationId) => {
        let sql = 'SELECT id, location_id, message, user_uin, user_first_name, date_created FROM reports WHERE location_id = ?';
        let params = [locationId];

        let result = await db.query(sql, params);
        return utils.convertPropsToCamelcase(result);
    },

    findByUserUin: async (userUin) => {
        let sql = 'SELECT id, location_id, message, user_uin, user_first_name, date_created FROM reports WHERE user_uin = ?';
        let params = [userUin];

        let result = await db.query(sql, params);
        return utils.convertPropsToCamelcase(result);
    },

    create: async (report) => {
        let sql = "INSERT INTO reports (location_id, message, user_uin, user_first_name, date_created) VALUES (?, ?, ?, ?, ?)";
        let params = [report.locationId, report.message, report.userUin, report.userFirstName, new Date()];

        return await db.query(sql, params);
    },

    delete: async (id) => {
        let sql = 'DELETE FROM reports WHERE id = ?';
        let params = [id];

        return await db.query(sql, params);
    }
};
