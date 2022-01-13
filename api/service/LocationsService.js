const locationsRepository = require("../repository/LocationsRepository.js");
const usersRepository = require("../repository/UsersRepository.js");

const utils = require("../utils/Utils.js");

module.exports = {
    findAll: async (filter) => {
        return await locationsRepository.findAll(filter)
    },

    findAllAdmin: async () => {
        return await locationsRepository.findAllAdmin()
    },

    findOne: async (id) => {
        return await locationsRepository.findOne(id)
    },

    findByUserUin: async (userUin) => {
        return await locationsRepository.findByUserUin(userUin)
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
            throw { error: 'error.notFound' }
        }

        return await locationsRepository.updateImage(location.imageName, image)
    },

    toggleConfirmed: async (id) => {
        // TODO validation

        let location = await locationsRepository.findOne(id)
        if (!location) {
            throw { error: 'error.notFound' }
        }

        let confirmed = Math.abs(location.confirmed - 1);
        if (confirmed && !location.rewarded) {
          usersRepository.addBalance(location.userUin, 500);
        }

        return await locationsRepository.updateConfirmed(id, confirmed)
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
    },

    findNearestLocation: async (lat, lng) => {
        let locations = await locationsRepository.findAll({ type: 'CHARGE' });

        let pi = Math.PI;
        let R = 6371; //equatorial radius
        let distances = [];
        let closest = -1;

        for (let i = 0; i < locations.length; i++) {
            let lat2 = locations[i].lat;
            let lng2 = locations[i].lng;

            let chLat = lat2 - lat;
            let chLon = lng2 - lng;

            let dLat = chLat * (pi / 180);
            let dLon = chLon * (pi / 180);

            let rLat1 = lat * (pi / 180);
            let rLat2 = lat2 * (pi / 180);

            let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(rLat1) * Math.cos(rLat2);
            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            let d = R * c;

            distances[i] = d;

            if (closest === -1 || d < distances[closest] ) {
                closest = i;
            }
        }

        return { distance: Math.round(distances[closest] * 10) / 10, ...locations[closest] };
    }
};
