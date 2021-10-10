const db = require("../db.js");
const utils = require("../utils/Utils.js");

module.exports = {
    findAll: async () => {
        let sql = 'SELECT id, first_name AS firstName, uin, photo_url AS photoUrl, username, role, birthyear, languages, location, transport_model AS transportModel FROM users';
        return await db.query(sql);
    },

    findOne: (id) => {

    },

    findByUin: async (uin) => {
        let sql = 'SELECT first_name, username, uin, photo_url, role FROM users WHERE uin = ?';
        let params = [uin];

        let users = await db.query(sql, params);
        return users[0] ? utils.convertPropsToCamelcase(users[0]) : null;
    },

    create: async (user) => {
        let sql = "INSERT INTO users (first_name, uin, photo_url, username, role, birthyear, languages, location, transport_model) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        let params = [user.firstName, user.uin, user.photoUrl, user.username, 'USER', user.birthyear, user.languages, user.location, user.transportModel];

        return await db.query(sql, params);
    },

    update: async (uin, user) => {
        let sql = 'UPDATE users SET first_name = ?, birthyear = ?, languages = ?, location = ?, transport_model = ? WHERE uin = ?';
        let params = [user.firstName, user.birthyear, user.languages, user.location, user.transportModel, uin];

        return await db.query(sql, params);
    },

    delete: async (uin) => {
        let sql = 'DELETE FROM users WHERE uin = ?';
        let params = [uin];

        return await db.query(sql, params);
    }
};
