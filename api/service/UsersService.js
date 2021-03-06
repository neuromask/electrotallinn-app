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
            user.transportPhoto = await utils.resizeImage(utils.b64ToBuffer(user.transportPhoto), {width: 1024, height: 1024});

            user.transportPhotoName = utils.uuid() + '.jpg'
        }

        return await usersRepository.update(uin, user)
    },

    delete: async (uin) => {
        return await usersRepository.delete(uin)
    },

    updateBalance: async (uin, user) => {
        return await usersRepository.updateBalance(uin, user.balance)
    }
};
