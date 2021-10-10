const usersRepository = require("../repository/UsersRepository.js");

module.exports = {
    findAll: async () => {
        return await usersRepository.findAll()
    },

    findByUin: async (uin) => {
        return await usersRepository.findByUin(uin)
    },

    create: async (user) => {
        // TODO validation

        return await usersRepository.create(user)
    },

    update: async (uin, user) => {
        // TODO validation

        return await usersRepository.update(uin, user)
    },

    delete: async (uin) => {
        return await usersRepository.delete(uin)
    }
};
