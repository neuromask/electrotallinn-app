const db = require("../db.js");
const utils = require("../utils/Utils.js");

module.exports = {
    findAll: async () => {
        let sql = 'SELECT id, first_name AS firstName, uin, photo_url AS photoUrl, username, role, birthyear, languages, location, transport_model AS transportModel, transport_photo_name AS transportPhotoName, (SELECT count(l.id) FROM locations  l WHERE l.user_uin = uin) AS locationsCount FROM users';
        return await db.query(sql);
    },

    findOne: (id) => {

    },

    findByUin: async (uin) => {
        let sql = 'SELECT first_name, username, uin, photo_url, role, birthyear, languages, location, transport_model, transport_photo_name, (SELECT count(l.id) FROM locations  l WHERE l.user_uin = uin) AS locations_count FROM users WHERE uin = ?';
        let params = [uin];

        let result = await db.query(sql, params);
        return result[0] ? utils.convertPropsToCamelcase(result[0]) : null;
    },

    findTransportPhotoByName: async (name) => {
        let sql = 'SELECT transport_photo FROM users WHERE transport_photo_name = ?';
        let params = [name];

        let result = await db.query(sql, params);
        return result[0] ? utils.convertPropsToCamelcase(result[0]).transportPhoto : null;
    },

    create: async (user) => {
        let sql = "INSERT INTO users (first_name, uin, photo_url, username, role, birthyear, languages, location, transport_model) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        let params = [user.firstName, user.uin, user.photoUrl, user.username, 'USER', user.birthyear, user.languages, user.location, user.transportModel];

        return await db.query(sql, params);
    },

    update: async (uin, user) => {
        // update transport photo
        if (user.transportPhoto != null) {
            let sql = 'UPDATE users SET transport_photo = ? WHERE uin = ?';
            let params = [user.transportPhoto, uin];
            await db.query(sql, params);
        }

        // delete transport photo
        if (user.transportPhotoName == null) {
            let sql = 'UPDATE users SET transport_photo = ? WHERE uin = ?';
            let params = [null, uin];
            await db.query(sql, params);
        }

        // update rest data
        {
            let sql = 'UPDATE users SET first_name = ?, photo_url = ?, username = ?, birthyear = ?, languages = ?, location = ?, transport_model = ?, transport_photo_name = ? WHERE uin = ?';
            let params = [user.firstName, user.photoUrl, user.username, user.birthyear, user.languages, user.location, user.transportModel, user.transportPhotoName, uin];
            return await db.query(sql, params);
        }
    },

    delete: async (uin) => {
        let sql = 'DELETE FROM users WHERE uin = ?';
        let params = [uin];

        return await db.query(sql, params);
    }
};
