const express = require('express');
const cookieParser = require("cookie-parser");
//const sessions = require('express-session');
const sharp = require('sharp');
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
// const LocalStorage = require('node-localstorage').LocalStorage;
require('dotenv').config();

const authenticationController = require('./controller/authenticationController');
const usersController = require('./controller/usersController');
const locationsController = require('./controller/locationsController');
const imagesController = require('./controller/imagesController');
const marketController = require('./controller/marketController');

// const localStorage = new LocalStorage('./scratch');

//const BACKEND_PORT = 8080;

const ONE_DAY = 1000 * 60 * 60 * 24;
const JWT_SECRET = "supersecretjwtada8sd8a7d9ad79a";

const app = express();

// MySQL
const mysql = require('mysql');
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


//app.listen(BACKEND_PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
/*app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir761",
    saveUninitialized: true,
    cookie: { maxAge: ONE_DAY },
    resave: false
}));*/


// validates telegram hash
const validateTgHash = (request, response, next) => {
    try {
        const { hash, ...tgUserData } = request.body;

        const TOKEN = process.env.TELEGRAM_TOKEN;
        const secret = crypto.createHash('sha256')
            .update(TOKEN)
            .digest();

        const checkString = Object.keys(tgUserData)
            .sort()
            .map(k => (`${k}=${tgUserData[k]}`))
            .join('\n');

        const hex = crypto.createHmac('sha256', secret)
            .update(checkString)
            .digest('hex');

        if (hex !== hash) {
            return response.status(401).send('Login failed');
        }

        request.tgUser = tgUserData;
        next();
    } catch(e) {
        return response.status(401).send(`Login failed. ${e}`);
    }
};

// validates JWT
const authenticateJWT = (request, response, next) => {
    const authHeader = request.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, JWT_SECRET, (error, user) => {
            if (error) {
                console.error(JSON.stringify(error));
                return response.sendStatus(403);
            }

            request.user = user;
            next();
        });
    } else {
        console.error('Auth header missing');
        response.sendStatus(401);
    }
};

const checkRole = (role) => {
    return (request, response, next) => {
        if (request.user && request.user.role === role) {
            next();
        } else {
            response.status(403).send('Restricted');
        }
    };
};

// Backend

app.use('/test/authentication', authenticationController);
app.use('/test/users', usersController);
app.use('/test/locations', locationsController);
app.use('/test/market', marketController);
app.use('/test/images', imagesController);

// images
app.get('/images/:imageName', async function(request, response) {
    let sql = 'SELECT image FROM locations WHERE image_name = ?';
    let params = [request.params.imageName];

    let result = await query(sql, params);
    response.end(result[0].image, 'binary');
});

app.put('/images/rotate/:imageName', authenticateJWT, checkRole('ADMIN'), async function(request, response) {
    let sqlSelect = 'SELECT image FROM locations WHERE image_name = ?';
    let paramsSelect = [request.params.imageName];

    let resultSelect = await query(sqlSelect, paramsSelect);

    let outputBuffer = await sharp(resultSelect[0].image)
        .rotate(request.query.rotation ? parseInt(request.query.rotation) : 90)
        .toBuffer();

    let sqlUpdate = "UPDATE locations SET image = ? WHERE image_name = ?";
    let dataUpdate = [outputBuffer, request.params.imageName];

    let resultUpdate = await query(sqlUpdate, dataUpdate);
    response.send(resultUpdate);
});


// locations
app.get('/locations', async function(request, response) {
    let sql = 'SELECT id, title, lat, lng, description, type, image_name AS imageName, confirmed, user_first_name AS userFirstName, user_uin AS userUin FROM locations';

    let result = await query(sql);
    response.send(result);
});

app.get('/locations/:id(\\d+)', async function(request, response) {
    let sql = 'SELECT id, title, lat, lng, description, type, image_name AS imageName, confirmed, user_first_name AS userFirstName, user_uin AS userUin FROM locations WHERE id = ?';
    let params = [request.params.id];

    let result = await query(sql, params);
    if (!!result[0]) {
        response.send(result[0]);
    } else {
        response.status(404).send('Location not found');
    }
});

// CREATE
app.post('/locations', authenticateJWT, checkRole('ADMIN'), async function(request, response) {
    // TODO validation

    let sql = 'INSERT INTO locations (title, description, lat, lng, image, image_name, type, user_first_name, user_uin, confirmed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    let params = [request.body.title, request.body.description, request.body.lat, request.body.lng, request.body.image, request.body.image_name, request.body.type, request.body.userFirstName, request.body.userUin, 0];

    let result = await query(sql, params);
    response.send(result);
});


// UPDATE
app.put('/locations/:id(\\d+)', authenticateJWT, checkRole('ADMIN'), async function(request, response) {
    // TODO validation

    let sql = 'UPDATE locations SET title = ?, description = ?, type = ? WHERE id = ?';
    let params = [request.body.title, request.body.description, request.body.type, request.params.id];

    let result = await query(sql, params);
    response.send(result);
});

// UPDATE image
app.put('/locations/:id(\\d+)/image', authenticateJWT, checkRole('ADMIN'), async function(request, response) {
    // TODO validation

    let sql = 'UPDATE locations SET image = ? WHERE id = ?';
    let params = [request.body.image, request.params.id];

    let result = await query(sql, params);
    response.send(result);
});

// DELETE
app.delete('/locations/:id(\\d+)', authenticateJWT, checkRole('ADMIN'), async function(request, response) {
    let sql = 'DELETE FROM locations WHERE id = ?';
    let params = [request.params.id];

    let result = await query(sql, params);
    response.send(result);
});

app.put('/locations/:id(\\d+)/confirmed/toggle', authenticateJWT, checkRole('ADMIN'), async function(request, response) {
    // TODO validation

    let locationsSql = 'SELECT id, confirmed FROM locations WHERE id = ?';
    let locationsSqlParams = [request.params.id];

    let locations = await query(locationsSql, locationsSqlParams);
    if (!locations[0]) {
        return response.status(404).send('Entity not found');
    }

    let sqlUpdate = "UPDATE locations SET confirmed = ? WHERE id = ?";
    let sqlUpdateParams = [Math.abs(locations[0].confirmed - 1), request.params.id];

    let updateResult = await query(sqlUpdate, sqlUpdateParams);

    response.send(updateResult);

    // connection.getConnection(function(cError, c) {
    // if (cError) {
    //     c.release();
    //     return response.status(500).send(cError);
    // }
    //
    // var sqlSelect = 'SELECT id, confirmed FROM locations WHERE id = ?';
    // var sqlSelectData = [request.params.id];
    //
    // c.query(sqlSelect, sqlSelectData, (error, sqlSelectResult, fields) => {
    //   if (error) {
    //     c.release();
    //     return response.status(500).send(error);
    //   }
    //
    //   if (!sqlSelectResult[0]) {
    //     c.release();
    //     return response.status(404).send('Entity not found');
    //   }
    //
    //   var sqlUpdate = "UPDATE locations SET confirmed = ? WHERE id = ?";
    //   var sqlUpdateData = [Math.abs(sqlSelectResult[0].confirmed - 1), request.params.id];
    //
    //   c.query(sqlUpdate, sqlUpdateData, (error, sqlUpdateResult, fields) => {
    //     if (error) {
    //       c.release();
    //       return response.status(500).send(error);
    //     }
    //
    //     c.release();
    //     response.send(sqlUpdateResult);
    //   });
    // });
    // });
});

app.get('/locations/top', async function(request, response) {
    let sql = 'SELECT (SELECT l2.user_first_name FROM locations l2 WHERE l2.user_uin = l.user_uin ORDER BY l2.id DESC limit 1) AS userFirstName, count(l.id) as count FROM locations l WHERE l.user_uin <> 0 GROUP BY l.user_uin';

    let result = await query(sql);
    response.send(result);
});


// users
app.get('/users', async function(request, response) {
    let sql = 'SELECT id, first_name AS firstName, uin, photo_url AS photoUrl, username, role, birthyear, languages, location, transport_model AS transportModel FROM users';

    let result = await query(sql);
    response.send(result);
});

app.get('/users/:uin(\\d+)', async function(request, response) {
    let sql = 'SELECT id, first_name AS firstName, uin, photo_url AS photoUrl, username, role, birthyear, languages, location, transport_model AS transportModel FROM users WHERE uin = ?';
    let params = [request.params.uin];

    let result = await query(sql, params);
    if (!!result[0]) {
        response.send(result[0]);
    } else {
        response.status(404).send('User not found');
    }
});

// CREATE
app.post('/users', authenticateJWT, checkRole('ADMIN'), async function(request, response) {
    // TODO validation

    let sql = 'INSERT INTO users (first_name, uin, photo_url, username, role, birthyear, languages, location, transport_model) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    let params = [request.body.firstName, request.body.uin, request.body.photoUrl, request.body.username, request.body.role, request.body.birthyear, request.body.languages, request.body.location, request.body.transportModel];

    let result = await query(sql, params);
    response.send(result);
});

// UPDATE
app.put('/users/:uin(\\d+)', authenticateJWT, async function(request, response) {
    // TODO validation

    console.info('Saving %s', JSON.stringify(request.body));

    if (+request.params.uin !== request.user.id && request.user.role !== 'ADMIN') {
        console.warn('Saving %s not allowed for user with uin %s', JSON.stringify(request.body), request.user.id);
        return response.status(403).send("Not allowed");
    }

    let sql = 'UPDATE users SET first_name = ?, birthyear = ?, languages = ?, location = ?, transport_model = ? WHERE uin = ?';
    let params = [request.body.firstName, request.body.birthyear, request.body.languages, request.body.location, request.body.transportModel, request.params.uin];

    let result = await query(sql, params);
    response.send(result);
});

// DELETE
app.delete('/users/:uin(\\d+)', authenticateJWT, checkRole('ADMIN'), async function(request, response) {
    let sql = 'DELETE FROM users WHERE uin = ?';
    let params = [request.params.uin];

    let result = await query(sql, params);
    response.send(result);
});


// user
app.get('/authentication/user', authenticateJWT, (request, response) => {
    response.send(`Welcome ${request.user.first_name} role ${request.user.role}`);

  // c.query('SELECT first_name AS firstName FROM users WHERE uin = ? ', [request.session.userId], (error, result, fields) => {
    // if (error) {
      // c.release();
      // return response.status(500).send(error);
    // }

    // if (!!result[0]) {
      // c.release();
      // response.send(`Welcome ${result[0].firstName}`);
    // } else {
      // response.status(401).send('User not found');
    // }
  // });
});


// authentication
app.post('/authentication/login', validateTgHash, async function(request, response) {
    try {
        let sql = 'SELECT * FROM users WHERE uin = ?';
        let params = [request.body.id];

        let result = await query(sql, params);

        if (!!result[0]) {
            const tgUser = { ...request.tgUser, role: result[0].role };
            const token = jwt.sign(tgUser, JWT_SECRET, { expiresIn: 86400 });

            response.send({
                auth: true,
                token: token,
                user: tgUser
            });
        } else {
            var newUserSql = "INSERT INTO users (first_name, username, uin, photo_url, role) VALUES (?, ?, ?, ?, ?)";
            var newUserSqlParams = [request.body.first_name, request.body.username, request.body.id, request.body.photo_url, 'USER'];

            let result = await query(newUserSql, newUserSqlParams);

            const tgUser = { ...request.tgUser, role: 'USER' };
            let token = jwt.sign(tgUser, JWT_SECRET, { expiresIn: 86400 });

            response.send({
                auth: true,
                token: token,
                user: tgUser
            });
        }


        // connection.getConnection(function(cError, c) {
        //     if (cError) {
        //         c.release();
        //         return response.status(500).send(cError);
        //     }
        //
        //     c.query('SELECT * FROM users WHERE uin = ?', [request.body.id], (error, result, fields) => {
        //         if (error) {
        //               c.release();
        //               return response.status(500).send(error);
        //         }
        //
        //         if (!!result[0]) {
        //             c.release();
        //
        //             const tgUser = { ...request.tgUser, role: result[0].role };
        //             const token = jwt.sign(tgUser, JWT_SECRET, { expiresIn: 86400 });
        //
        //             response.send({
        //                 auth: true,
        //                 token: token,
        //                 user: tgUser
        //             });
        //         } else {
        //             var sql = "INSERT INTO users (first_name, username, uin, photo_url, role) VALUES (?, ?, ?, ?, ?)";
        //             var data = [request.body.first_name, request.body.username, request.body.id, request.body.photo_url, 'USER'];
        //
        //             c.query(sql, data, (error, result, fields) => {
        //                 if (error) {
        //                     c.release();
        //                     return response.status(500).send(error);
        //                 }
        //
        //                 c.release();
        //
        //                 const tgUser = { ...request.tgUser, role: 'USER' };
        //                 let token = jwt.sign(tgUser, JWT_SECRET, { expiresIn: 86400 });
        //
        //                 response.send({
        //                     auth: true,
        //                     token: token,
        //                     user: tgUser
        //                 });
        //             });
        //         }
        //     });
        // });
    } catch(e) {
        response.send(`${e}`);
    }
});

app.get('/authentication/logout', (request, response) => {
    req.session.destroy();
    res.redirect('https://map.electrotallinn.ee');
});




// ##### EXPERIMENTS ZONE #####

app.post('/user', function(request, response) {
  connection.getConnection(function(cError, c) {
    if (cError) {
      c.release();
      return response.status(500).send(cError);
    }

    var userCheckSql = "SELECT * FROM user WHERE uin = ?";
    var userCheckSqlData = [request.body.uin];

    c.query(userCheckSql, userCheckSqlData, (userCheckError, userCheckResult, userCheckFields) => {
      if (userCheckError) {
        c.release();
        return response.status(500).send(userCheckError);
      }

      var sql = "";
      var data = "";

      if (!!userCheckResult[0]) {
        // update existing user
        var sql = "UPDATE user SET first_name = ?, photo_url = ?, username = ? WHERE uid = ?";
        var data = [request.body.firstName, request.body.photoUrl, request.body.username, request.body.uid];
      } else {
        // save new user
        var sql = "INSERT INTO user (first_name, photo_url, username, uid, role) VALUES (?, ?, ?, ?, ?)";
        var data = [request.body.firstName, request.body.photoUrl, request.body.username, request.body.uid, "USER"];
      }

      c.query(sql, data, (error, result, fields) => {
        if (error) {
          c.release();
          return response.status(500).send(error);
        }

        session = request.session;
        session.userId = request.query.username;
        c.release();
        response.send(`Login success as ${request.query.username}`);
      });
    });
  });
});

app.get('/testAuth', authenticateJWT, checkRole('ADMIN'), (request, response) => {

  response.send(`Welcome ${request.user.first_name}`);
});

app.post('/login_old', function(request, response) {
  connection.getConnection(function(cError, c) {
    if (cError) {
      c.release();
      return response.status(500).send(cError);
    }

    var sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    var data = [request.body.username, request.body.password];

    c.query(sql, data, (error, result, fields) => {
      if (error) {
        c.release();
        return response.status(500).send(error);
      }

      c.release();
      if (!!result[0]) {
        session = request.session;
        session.userId = request.body.username;
        response.send(`Login success as ${request.body.username}`);
      } else {
        response.status(401).send('Invalid username or password');
      }
    });
  });
});

app.get('/login_redirect', function(request, response) {
  connection.getConnection(function(cError, c) {
    if (cError) {
      c.release();
      return response.status(500).send(cError);
    }

    var redirectUrl = 'http://map.electrotallinn.ee';

    c.query('SELECT * FROM users WHERE uin = ? ', [request.query.id], (error, result, fields) => {
      if (error) {
        c.release();
        return response.status(500).send(error);
      }

      if (!!result[0]) {
        c.release();
        session = request.session;
        session.userId = request.query.uin;
        response.redirect(redirectUrl);
        // response.send(`Login success as ${result[0].first_name} with role ${result[0].role}`);
      } else {
        var sql = "INSERT INTO users (first_name, username, uin, photo_url, role) VALUES (?, ?, ?, ?, ?)";
        var data = [request.query.first_name, request.query.username, request.query.id, request.query.photo_url, 'USER'];

        c.query(sql, data, (error, result, fields) => {
          if (error) {
            c.release();
            return response.status(500).send(error);
          }

          c.release();
          session = request.session;
          session.userId = request.query.uin;
          response.redirect(redirectUrl);
          // response.send(`New user created. Login success as ${request.query.first_name} with role USER`);
        });
      }
    });
  });
  // response.status(401).send('Invalid username or password');
  // response.redirect('https://electrotallinn.ee/map');
});



app.get('/locations/test', async (request, response) => {
  try {
    let sql = 'SELECT id, title, lat, lng, description, type, image_name AS imageName, confirmed, user_first_name AS userFirstName, user_uin AS userUin FROM locations where id = ?';

    let result = await query(sql, [16]);
    response.send(result);
  } catch (e) {
    return response.status(500).send(e);
  }
});


// ##### EXPERIMENTS ZONE END #####


// for sql query
const query = (sql, params) =>{
    return new Promise((resolve, reject)=>{
        connection.query(sql, params || [], (error, result) => {
            if (error) {
                console.error("%s ", JSON.stringify(error));
                return reject(error);
            }
            return resolve(result);
        });
    });
};

module.exports = app;
