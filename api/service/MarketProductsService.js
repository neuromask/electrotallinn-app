const marketProductsRepository = require("../repository/MarketProductsRepository.js");
const marketProductImagesRepository = require("../repository/MarketProductImagesRepository.js");
const utils = require("../utils/Utils.js");
const validationUtils = require("../utils/ValidationUtils.js");
const fileManagerHelper = require("../utils/FileManagerHelper.js");

module.exports = {
    findAll: async (filter) => {
        let products = await marketProductsRepository.findAll(filter);
        for (let product of products) {
            product.images = await marketProductImagesRepository.findByMarketProductId(product.id)
        }

        return products;
    },

    findOne: async (id) => {
        let product = await marketProductsRepository.findOne(id);
        product.images = await marketProductImagesRepository.findByMarketProductId(id);

        return product;
    },

    findByUserUin: async (userUin) => {
        let products = await marketProductsRepository.findByUserUin(userUin);
        for (let product of products) {
            product.images = await marketProductImagesRepository.findByMarketProductId(product.id)
        }

        return products;
    },

    create: async (marketProduct, authHeader) => {
        validationUtils.validateMarketProduct(marketProduct);

        let result = await marketProductsRepository.create(marketProduct);

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

    update: async (id, marketProduct, authHeader) => {
        validationUtils.validateMarketProduct(marketProduct);

        let result = await marketProductsRepository.update(id, marketProduct);

        marketProduct.images = marketProduct.images || [];

        // delete missing files
        let existingImages = await marketProductImagesRepository.findByMarketProductId(id);
        existingImages.forEach(existingImage => {
            if (!marketProduct.images.find(image => image.fileName === existingImage.fileName)) {
                // delete file from file server
                fileManagerHelper.delete('market', existingImage.fileName, authHeader);

                // delete file record
                marketProductImagesRepository.delete(existingImage.id);
            }
        });

        // process new files
        marketProduct.images.forEach(async item => {
            try {
                if (item.id) {
                    return
                }

                let fileName = utils.uuid() + '.jpg';

                // create file on file server
                await fileManagerHelper.create('market', item.fileB64, fileName, authHeader);

                // create file record
                marketProductImagesRepository.create({marketProductId: id, fileName: fileName});
            } catch (e) {
                console.error(e);
            }
        });

        return result
    },

    delete: async (id, authHeader) => {
        let images = await marketProductImagesRepository.findByMarketProductId(id);
        for (let image of images) {
            // delete files on file server
            let imageFileDeleteResult = await fileManagerHelper.delete('market', image.fileName, authHeader);
        }

        return await marketProductsRepository.delete(id)
    },

    toggleStatus: async (id) => {
        let statuses = ['ACTIVE', 'INACTIVE'];
        let product = await marketProductsRepository.findOne(id);

        return await marketProductsRepository.updateStatus(id, statuses[Math.abs(statuses.indexOf(product.status) - 1)]);
    }
};
