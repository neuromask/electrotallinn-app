const db = require("../db.js");
const utils = require("../utils/Utils.js");

module.exports = {

    create: async (marketProductImage) => {
        let sql = "INSERT INTO market_product_images (market_product_id, file_name) VALUES (?, ?)";
        let params = [marketProductImage.marketProductId, marketProductImage.fileName];

        return await db.query(sql, params);
    },
};
