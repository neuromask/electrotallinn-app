const db = require("../db.js");
const utils = require("../utils/Utils.js");

module.exports = {

    findByMarketProductId: async (marketProductId) => {
        let sql = 'SELECT id, market_product_id, file_name FROM market_product_images WHERE market_product_id = ?';
        let params = [marketProductId];


        let result = await db.query(sql, params);
        return utils.convertPropsToCamelcase(result);
    },

    create: async (marketProductImage) => {
        let sql = "INSERT INTO market_product_images (market_product_id, file_name) VALUES (?, ?)";
        let params = [marketProductImage.marketProductId, marketProductImage.fileName];

        return await db.query(sql, params);
    },

    delete: async (id) => {
        let sql = 'DELETE FROM market_product_images WHERE id = ?';
        let params = [id];

        return await db.query(sql, params);
    },
};
