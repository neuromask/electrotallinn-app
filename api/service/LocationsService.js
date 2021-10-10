const locationsRepository = require("../repository/LocationsRepository.js");
const utils = require("../utils/Utils.js");

module.exports = {
    findAll: async () => {
        return await locationsRepository.findAll()
    },

    findOne: async (id) => {
        return await locationsRepository.findOne(id)
    },

    save: async (location) => {
        // TODO validation

        return await locationsRepository.save(location)
    },

    update: async (id, location) => {
        // TODO validation

        return await locationsRepository.update(id, location)
    },

    delete: async (id) => {
        return await locationsRepository.delete(id)
    },

    updateImage: async (id, image) => {
        // TODO validation

        let location = await locationsRepository.findOne(id)
        if (!location) {
            throw new Error('Not found')
        }

        return await locationsRepository.updateImage(location.imageName, image)
    },

    toggleConfirmed: async (id) => {
        // TODO validation

        let location = await locationsRepository.findOne(id)
        if (!location) {
            throw new Error('Not found')
        }

        return await locationsRepository.setConfirmed(id, Math.abs(location.confirmed - 1))
    },

    getTopLocationSubmitters: async () => {
        return await locationsRepository.getTopLocationSubmitters()
    },

    findLocationImageByName: async (name) => {
        return await locationsRepository.findImageByName(name);
    },

    rotateLocationImage: async (name, degree) => {
        let image = await locationsRepository.findImageByName(name);

        let outputBuffer = await utils.rotateImage(image, degree);

        await locationsRepository.updateImage(name, outputBuffer);
        return outputBuffer;
    }
};