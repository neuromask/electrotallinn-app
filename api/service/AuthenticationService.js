const usersRepository = require("../repository/UsersRepository.js");

module.exports = {
    handleLogin: async (uin, tgUser) => {
        try {
            let existingUser = await usersRepository.findByUin(uin);

            if (!!existingUser) {
                existingUser.firstName = tgUser.firstName;
                existingUser.photoUrl = tgUser.photoUrl;
                existingUser.username = tgUser.username;
                await usersRepository.update(uin, existingUser);
                return { ...tgUser, role: existingUser.role, location: existingUser.location, transportPhotoName: existingUser.transportPhotoName, balance: existingUser.balance };
            } else {
                await usersRepository.create(tgUser);
                return { ...tgUser, role: 'USER', location: null, transportPhotoName: null, balance: 200 };
            }
        } catch(e) {
            throw { error: 'error.unexpected', params: [e] }
        }
    }
};
