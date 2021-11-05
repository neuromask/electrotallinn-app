const db = require("../db.js");

module.exports = {
    findByLocationId: async (locationId) => {
        let sql = 'SELECT * FROM reports WHERE location_id = ?';
        let params = [locationId];

        let result = await db.query(sql, params);
        return result[0] ? utils.convertPropsToCamelcase(result[0]) : null;
    },

    findByUserUin: async (userUin) => {
        let sql = 'SELECT * FROM reports WHERE user_uin = ?';
        let params = [userUin];

        let result = await db.query(sql, params);
        return result[0] ? utils.convertPropsToCamelcase(result[0]) : null;
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
