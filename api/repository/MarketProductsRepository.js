const db = require("../db.js");
const utils = require("../utils/Utils.js");

module.exports = {
    findAll: async (filter) => {
        let where = '';
        for (const [key, value] of Object.entries(filter || {})) {
            where = where + (where ? ' AND ' : ' WHERE ') + `${key} = ${value}`;
        }

        let sql = 'SELECT p.id, p.user_uin AS userUin, p.name, p.description, p.price, p.status, p.date_created, p.category, u.first_name AS userFirstName, u.username, u.photo_url AS userPhotoUrl FROM market_products p JOIN users u ON u.uin = p.user_uin' + where;
        return await db.query(sql);
    },

    findOne: async (id) => {
        let sql = 'SELECT p.id, p.user_uin, p.name, p.description, p.price, p.status, p.date_created, category, u.first_name AS user_first_name, u.username, u.photo_url AS user_photo_url FROM market_products p JOIN users u ON u.uin = p.user_uin WHERE p.id = ?';
        let params = [id];

        let result = await db.query(sql, params);
        return result[0] ? utils.convertPropsToCamelcase(result[0]) : null;
    },

    create: async (marketProduct) => {
        let sql = "INSERT INTO market_products (user_uin, name, description, price, status, date_created, category) VALUES (?, ?, ?, ?, ?, ?, ?)";
        let params = [marketProduct.userUin, marketProduct.name, marketProduct.description, marketProduct.price, 'NEW', new Date(), marketProduct.category];

        return await db.query(sql, params);
    },

    update: async (id, marketProduct) => {
        let sql = "UPDATE market_products SET user_uin = ?, name = ?, description = ?, price = ?, category = ? WHERE id = ?";
        let params = [marketProduct.userUin, marketProduct.name, marketProduct.description, marketProduct.price, marketProduct.category, id];

        return await db.query(sql, params);
    },

    delete: async (id) => {
        let sql = 'DELETE FROM market_products WHERE id = ?';
        let params = [id];

        return await db.query(sql, params);
    }
};
