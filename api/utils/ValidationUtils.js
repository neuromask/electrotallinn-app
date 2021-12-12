module.exports = {
    validateMarketProduct: (marketProduct) => {
        if (!marketProduct.userUin) {
            throw { error: 'Product userUin is empty!' }
        }

        if (!marketProduct.name) {
            throw { error: 'Product name is empty!' }
        }

        if (!marketProduct.description) {
            throw { error: 'Product description is empty!' }
        }

        if (!marketProduct.price) {
            throw { error: 'Product price is empty!' }
        }

        if (!marketProduct.category) {
            throw { error: 'Product category is empty!' }
        }

        if (!marketProduct.images || marketProduct.images.length === 0) {
            throw { error: 'Product should have at least one image!' }
        }
    }
};
