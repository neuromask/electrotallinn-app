const db = require("../db.js");

module.exports = {
    findAll: async () => {
        let sql = 'SELECT id, title, lat, lng, description, type, image_name AS imageName, confirmed, user_first_name AS userFirstName, user_uin AS userUin FROM locations';
        return await db.query(sql);
    },

    findOne: async (id) => {
        let sql = 'SELECT id, title, lat, lng, description, type, image_name AS imageName, confirmed, user_first_name AS userFirstName, user_uin AS userUin FROM locations WHERE id = ?';
        let params = [id];

        let result = await db.query(sql, params);
        return result[0];
    },

    save: async (location) => {
        let sql = 'INSERT INTO locations (title, description, lat, lng, image, image_name, type, user_first_name, user_uin, confirmed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        let params = [location.title, location.description, location.lat, location.lng, location.image, location.image_name, location.type, location.userFirstName, location.userUin, 0];

        return await db.query(sql, params);
    },

    update: async (id, location) => {
        let sql = 'UPDATE locations SET title = ?, description = ?, type = ? WHERE id = ?';
        let params = [location.title, location.description, location.type, id];

        return await db.query(sql, params);
    },

    delete: async (id) => {
        let sql = 'DELETE FROM locations WHERE id = ?';
        let params = [id];

        return await db.query(sql, params);
    },

    setConfirmed: async (id, confirmed) => {
        let sql = 'UPDATE locations SET confirmed = ? WHERE id = ?';
        let params = [confirmed, id];

        return await db.query(sql, params);
    },

    getTopLocationSubmitters: async () => {
        let sql = 'SELECT (SELECT l2.user_first_name FROM locations l2 WHERE l2.user_uin = l.user_uin ORDER BY l2.id DESC limit 1) AS userFirstName, count(l.id) as count FROM locations l WHERE l.user_uin <> 0 GROUP BY l.user_uin';

        return await db.query(sql);
    },

    findImageByName: async (name) => {
        let sql = 'SELECT image FROM locations WHERE image_name = ?';
        let params = [name];

        let result = await db.query(sql, params);
        return result[0].image;
    },

    updateImage: async (name, image) => {
        let sql = "UPDATE locations SET image = ? WHERE image_name = ?";
        let params = [image, name];

        return await db.query(sql, params);
    }
};