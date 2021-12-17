const db = require("../db.js");
const utils = require("../utils/Utils.js");

module.exports = {
    findAll: async (filter) => {
        filter = filter || {};

        let andList = [];
        let filterParams = [];
        for (const [key, value] of Object.entries(filter)) {
            if (key === 'category') {
                let orList = [];
                for (const v of value) {
                    orList.push(`p.category = ?`);
                    filterParams.push(v);
                }
                andList.push('(' + orList.join(' OR ') + ')');
            } else if (key === 'searchText') {
                let orList = [];
                orList.push(`LOWER(p.name) LIKE LOWER(?)`);
                orList.push(`LOWER(p.description) LIKE LOWER(?)`);

                filterParams.push(`%${value}%`);
                filterParams.push(`%${value}%`);

                andList.push('(' + orList.join(' OR ') + ')');
            } else if (key === 'status') {
                andList.push('p.status = ?');
                filterParams.push(value);
            }
        }
        let where = (andList.length > 0 ? ' WHERE ' : '') + andList.join(' AND ') + ' ';

        let sql = 'SELECT p.id, p.user_uin AS userUin, p.name, p.description, p.price, p.status, p.date_created, p.category, u.first_name AS userFirstName, u.username, u.photo_url AS userPhotoUrl ' +
            'FROM market_products p ' +
            'JOIN users u ON u.uin = p.user_uin ' +
            where +
            'ORDER BY id DESC';
        let params = filterParams;

        return await db.query(sql, params);
    },

    findOne: async (id) => {
        let sql = 'SELECT p.id, p.user_uin, p.name, p.description, p.price, p.status, p.date_created, category, u.first_name AS user_first_name, u.username, u.photo_url AS user_photo_url FROM market_products p JOIN users u ON u.uin = p.user_uin WHERE p.id = ?';
        let params = [id];

        let result = await db.query(sql, params);
        return result[0] ? utils.convertPropsToCamelcase(result[0]) : null;
    },

    create: async (marketProduct) => {
        let sql = "INSERT INTO market_products (user_uin, name, description, price, status, date_created, category) VALUES (?, ?, ?, ?, ?, ?, ?)";
        let params = [marketProduct.userUin, marketProduct.name, marketProduct.description, marketProduct.price, 'ACTIVE', new Date(), marketProduct.category];

        return await db.query(sql, params);
    },

    update: async (id, marketProduct) => {
        let sql = "UPDATE market_products SET user_uin = ?, name = ?, description = ?, price = ?, category = ? WHERE id = ?";
        let params = [marketProduct.userUin, marketProduct.name, marketProduct.description, marketProduct.price, marketProduct.category, id];

        return await db.query(sql, params);
    },

    updateStatus: async (id, status) => {
        let sql = "UPDATE market_products SET status = ? WHERE id = ?";
        let params = [status, id];

        return await db.query(sql, params);
    },

    delete: async (id) => {
        let sql = 'DELETE FROM market_products WHERE id = ?';
        let params = [id];

        return await db.query(sql, params);
    },

    findByUserUin: async (userUin) => {
        let sql = 'SELECT p.id, p.user_uin, p.name, p.description, p.price, p.status, p.category FROM market_products p WHERE user_uin = ? ORDER BY id DESC';
        let params = [userUin];

        let result = await db.query(sql, params);
        return utils.convertPropsToCamelcase(result);
    },

    exists: async (id, userUin) => {
        let sql = 'SELECT 1 FROM market_products p WHERE id =? AND user_uin = ?';
        let params = [id, userUin];

        let result = await db.query(sql, params);
        return !!result[0];
    }
};
