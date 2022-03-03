const minecraftRepository = require("../repository/MinecraftRepository.js");

module.exports = {
  getStatistics: async () => {
    return await minecraftRepository.getStatistics()
  }
};
