const db = require("../db.js");

module.exports = {
  getStatistics: async () => {
    let sql = 'SELECT (SELECT count(id) FROM locations) AS locationsCount, (SELECT count(id) FROM users) AS profilesCount, (SELECT count(id) FROM market_products) AS productsCount FROM dual';

    return (await db.query(sql))[0];
  }
};
