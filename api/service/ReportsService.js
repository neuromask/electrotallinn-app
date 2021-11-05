const reportsRepository = require("../repository/ReportsRepository.js");

module.exports = {
    create: async (report) => {
        return await reportsRepository.create(report)
    },

    findByLocationId: async (locationId) => {
        return await reportsRepository.findByLocationId(locationId)
    },

    findByUserUin: async (userUin) => {
        return await reportsRepository.findByUserUin(userUin)
    },
};
