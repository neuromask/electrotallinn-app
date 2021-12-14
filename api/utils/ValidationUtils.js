module.exports = {
    validateMarketProduct: (marketProduct) => {
        if (!marketProduct.userUin) {
            throw { error: 'error.productUserUinEmpty' }
        }

        if (!marketProduct.name) {
            throw { error: 'error.productNameEmpty' }
        }

        if (!marketProduct.description) {
            throw { error: 'error.productDescriptionEmpty' }
        }

        if (!marketProduct.price) {
            throw { error: 'error.productPriceEmpty' }
        }

        if (!marketProduct.category) {
            throw { error: 'error.productCategoryEmpty' }
        }

        if (!marketProduct.images || marketProduct.images.length === 0) {
            throw { error: 'error.productImageEmpty' }
        }
    }
};
