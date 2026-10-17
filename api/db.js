// MySQL
const mysql = require('mysql');
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Idle connections in the pool can emit errors (server restart, timeout, ...).
// Without a listener EventEmitter throws and pm2 restarts the whole process.
connection.on('error', (error) => {
    console.error('MySQL pool error:', error);
});

module.exports = {
    query: (sql, params) => {
        return new Promise((resolve, reject) => {
            connection.getConnection(function(cError, c) {
                if (cError) {
                    // c is undefined when the connection could not be acquired
                    if (c) {
                        c.release();
                    }
                    console.error("MySQL connection error:", cError);
                    return reject(cError);
                }

                try {
                    c.query(sql, params || [], (error, result) => {
                        c.release();

                        if (error) {
                            console.error("MySQL query error:", error);
                            return reject(error);
                        }

                        return resolve(result);
                    });
                } catch (e) {
                    c.release();
                    console.error("MySQL query error:", e);
                    return reject(e);
                }
            });
        });
    }
};
