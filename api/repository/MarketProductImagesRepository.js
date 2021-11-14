const db = require("../db.js");
const utils = require("../utils/Utils.js");

module.exports = {

    findByMarketProductId: async (marketProductId) => {
        let sql = 'SELECT market_product_id AS marketProductId, file_name AS fileName FROM market_product_images WHERE market_product_id = ?';
        let params = [marketProductId];

        return await db.query(sql, params);
    },

    create: async (marketProductImage) => {
        let sql = "INSERT INTO market_product_images (market_product_id, file_name) VALUES (?, ?)";
        let params = [marketProductImage.marketProductId, marketProductImage.fileName];

        return await db.query(sql, params);
    }
};
