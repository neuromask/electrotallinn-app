const marketProductsRepository = require("../repository/MarketProductsRepository.js");

module.exports = {
    findAll: async (filter) => {
        return await marketProductsRepository.findAll(filter)
    },

    findOne: async (id) => {
        return await marketProductsRepository.findOne(id)
    },

    create: async (marketProduct) => {
        //todo save images

        return await marketProductsRepository.create(marketProduct)
    },

    update: async (id, marketProduct) => {
        //todo update images

        return await marketProductsRepository.update(id, marketProduct)
    },

    delete: async (id) => {
        return await marketProductsRepository.delete(id)
    }
};
