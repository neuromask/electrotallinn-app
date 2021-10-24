const usersRepository = require("../repository/UsersRepository.js");
const utils = require("../utils/Utils.js");

module.exports = {
    findAll: async () => {
        return await usersRepository.findAll()
    },

    findByUin: async (uin) => {
        return await usersRepository.findByUin(uin)
    },

    findTransportPhotoByName: async (name) => {
        return await usersRepository.findTransportPhotoByName(name)
    },

    create: async (user) => {
        // TODO validation

        return await usersRepository.create(user)
    },

    update: async (uin, user) => {
        // TODO validation

        if (user.transportPhoto != null) {
            user.transportPhotoName = utils.uuid() + '.jpg'
        }

        return await usersRepository.update(uin, user)
    },

    delete: async (uin) => {
        return await usersRepository.delete(uin)
    }
};
