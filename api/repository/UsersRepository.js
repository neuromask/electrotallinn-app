const db = require("../db.js");
const utils = require("../utils/Utils.js");

module.exports = {
    findAll: async () => {
        let sql = 'SELECT id, first_name, uin, photo_url, username, role, birthyear, languages, location, transport_model, transport_photo_name AS transport_photo_name, balance, facebook_url, youtube_url, instagram_url, (SELECT count(l.id) FROM locations l WHERE l.user_uin = uin) AS locations_count, (SELECT count(mp.id) FROM market_products mp WHERE mp.user_uin = uin AND mp.status = \'ACTIVE\') AS market_products_count FROM users';

        let result = await db.query(sql);
        return utils.convertPropsToCamelcase(result);
    },

    findOne: (id) => {

    },

    findByUin: async (uin) => {
        let sql = 'SELECT first_name, username, uin, photo_url, role, birthyear, languages, location, transport_model, transport_photo_name, balance, facebook_url, youtube_url, instagram_url, (SELECT count(l.id) FROM locations l WHERE l.user_uin = uin) AS locations_count, (SELECT count(mp.id) FROM market_products mp WHERE mp.user_uin = uin AND mp.status = \'ACTIVE\') AS market_products_count FROM users WHERE uin = ?';
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
            let sql = 'UPDATE users SET first_name = ?, photo_url = ?, username = ?, birthyear = ?, languages = ?, location = ?, transport_model = ?, transport_photo_name = ?, facebook_url = ?, youtube_url = ?, instagram_url = ? WHERE uin = ?';
            let params = [user.firstName, user.photoUrl, user.username, user.birthyear, user.languages, user.location, user.transportModel, user.transportPhotoName, user.facebookUrl, user.youtubeUrl, user.instagramUrl, uin];
            return await db.query(sql, params);
        }
    },

    delete: async (uin) => {
        let sql = 'DELETE FROM users WHERE uin = ?';
        let params = [uin];

        return await db.query(sql, params);
    },

    updateBalance: async (uin, balance) => {
        let sql = 'UPDATE users SET balance = ? WHERE uin = ?';
        let params = [balance, uin];
        return await db.query(sql, params);
    },

    addBalance: async (uin, balance) => {
      let sql = 'UPDATE users SET balance = balance + ? WHERE uin = ?';
      let params = [balance, uin];
      return await db.query(sql, params);
    }
};
