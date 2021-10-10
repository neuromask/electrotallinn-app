const usersRepository = require("../repository/UsersRepository.js");

module.exports = {
    handleLogin: async (uin, tgUser) => {
        try {
            let existingUser = await usersRepository.findByUin(uin);

            console.info('existingUser %s', existingUser);

            if (!!existingUser) {
                return { ...tgUser, role: existingUser.role };
            } else {
                await usersRepository.create(tgUser);
                return { ...tgUser, role: 'USER' };
            }
        } catch(e) {
            throw new Error(`${e}`)
        }
    }
};
