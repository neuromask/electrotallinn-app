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
                return { ...tgUser, role: existingUser.role };
            } else {
                await usersRepository.create(tgUser);
                return { ...tgUser, role: 'USER' };
            }
        } catch(e) {
            throw { error: `${e}` }
        }
    }
};
