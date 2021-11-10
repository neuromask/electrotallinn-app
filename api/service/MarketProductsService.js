const marketProductsRepository = require("../repository/MarketProductsRepository.js");

module.exports = {
    findAll: async (filter) => {
        return await marketProductsRepository.findAll(filter)
    },

    findOne: async (id) => {
        return await marketProductsRepository.findOne(id)
    },
};
