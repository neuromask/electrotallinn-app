const marketProductsRepository = require("../repository/MarketProductsRepository.js");
const marketProductImagesRepository = require("../repository/MarketProductImagesRepository.js");
const utils = require("../utils/Utils.js");
const fileManagerHelper = require("../utils/FileManagerHelper.js");

module.exports = {
    findAll: async (filter) => {
        let products = await marketProductsRepository.findAll(filter);
        for (let product of products) {
            product.images = await marketProductImagesRepository.findByMarketProductId(product.id)
        }

        return products
    },

    findOne: async (id) => {
        let product = await marketProductsRepository.findOne(id);
        product.images = await marketProductImagesRepository.findByMarketProductId(id);

        return product;
    },

    create: async (marketProduct, authHeader) => {
        let result = await marketProductsRepository.create(marketProduct)
        console.log("id " + result.insertId);

        // todo save images
        marketProduct.images = marketProduct.images || [];
        marketProduct.images.forEach(async item => {
            try {
                let fileName = utils.uuid() + '.jpg';

                // create file on file server
                let res = await fileManagerHelper.create('market', item.fileB64, fileName, authHeader);

                // create file record
                marketProductImagesRepository.create({marketProductId: result.insertId, fileName: fileName});
            } catch (e) {
                console.error(e);
            }
        });

        return result
    },

    update: async (id, marketProduct) => {
        //todo update images

        return await marketProductsRepository.update(id, marketProduct)
    },

    delete: async (id) => {
        return await marketProductsRepository.delete(id)
    }
};
