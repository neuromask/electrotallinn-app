const db = require("../db.js");
const utils = require("../utils/Utils.js");

module.exports = {
    findByLocationId: async (locationId) => {
        let sql = 'SELECT id, location_id AS locationId, message, user_uin AS userUin, user_first_name AS userFirstName, date_created AS dateCreated FROM reports WHERE location_id = ?';
        let params = [locationId];

        return await db.query(sql, params);
    },

    findByUserUin: async (userUin) => {
        let sql = 'SELECT id, location_id AS locationId, message, user_uin AS userUin, user_first_name AS userFirstName, date_created AS dateCreated FROM reports WHERE user_uin = ?';
        let params = [userUin];

        return await db.query(sql, params);
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
