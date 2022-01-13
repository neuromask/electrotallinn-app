const homeRepository = require("../repository/HomeRepository.js");

module.exports = {
  getStatistics: async () => {
    return await homeRepository.getStatistics()
  }
};
