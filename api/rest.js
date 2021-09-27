const express = require('express');
const cookieParser = require("cookie-parser");
//const sessions = require('express-session');
const sharp = require('sharp');
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
// const LocalStorage = require('node-localstorage').LocalStorage;
require('dotenv').config();

// const localStorage = new LocalStorage('./scratch');

//const BACKEND_PORT = 8080;

const ONE_DAY = 1000 * 60 * 60 * 24;
const JWT_SECRET = "supersecretjwtada8sd8a7d9ad79a";

const app = express();

// MySQL
const mysql = require('mysql');
const connection = mysql.createPool({
	host      : process.env.DB_HOST,
	user      : process.env.DB_USER,
	password  : process.env.DB_PASS,
	database  : process.env.DB_NAME
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
			.digest()
		
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

        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return response.sendStatus(403);
            }

            request.user = user;
            next();
        });
    } else {
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

// images
app.get('/images/:imageName', function(request, response) {
	connection.getConnection(function(cError, c) {
		if (cError) {
			c.release();
			return response.status(500).send(JSON.stringify(cError));
		}
		
		var sql = 'SELECT image FROM locations WHERE image_name = ?';
		var data = [request.params.imageName];
		
		c.query(sql, data, (error, result, fields) => {
			if (error) {
				c.release();
				return response.status(500).send(JSON.stringify(error));
			}
			
			c.release();
			response.end(result[0].image, 'binary');
		});
	});
});

app.put('/images/rotate/:imageName', authenticateJWT, checkRole('ADMIN'), function(request, response) {
	connection.getConnection(function(cError, c) {
		if (cError) {
			c.release();
			return response.status(500).send(JSON.stringify(cError));
		}
		
		var sqlSelect = 'SELECT image FROM locations WHERE image_name = ?';
		var dataSelect = [request.params.imageName];
		
		c.query(sqlSelect, dataSelect, (errorSelect, resultSelect, fieldsSelect) => {
			if (errorSelect) {
				c.release();
				return response.status(500).send(JSON.stringify(errorSelect));
			}
			
			// c.release();
			
			sharp(resultSelect[0].image)
				.rotate(request.query.rotation ? parseInt(request.query.rotation) : 90)
				.toBuffer()
				.then(function(outputBuffer) {
					var sqlUpdate = "UPDATE locations SET image = ? WHERE image_name = ?";
					var dataUpdate = [outputBuffer, request.params.imageName];
					
					c.query(sqlUpdate, dataUpdate, (errorUpdate, resultUpdate, fieldsUpdate) => {
						if (errorUpdate) {
							c.release();
							return response.status(500).send(errorUpdate);
						}
						
						c.release();
						response.send(resultUpdate);
					});
					
					
					
					
					// response.end(outputBuffer);
				});
		});
	});
});


// locations
app.get('/locations', function(request, response) {
	connection.getConnection(function(cError, c) {
		if (cError) {
			c.release();
			return response.status(500).send(cError);
		}
		
		var sql = 'SELECT id, title, lat, lng, description, type, image_name AS imageName, confirmed, user_first_name AS userFirstName, user_uin AS userUin FROM locations';
		
		c.query(sql, (error, result, fields) => {
			if (error) {
				c.release();
				return response.status(500).send(error);
			}
			
			c.release();
			response.send(result);
		});
	});
});

app.get('/locations/:id(\\d+)', function(request, response) {
	connection.getConnection(function(cError, c) {
		if (cError) {
			c.release();
			return response.status(500).send(cError);
		}
		
		var sql = 'SELECT id, title, lat, lng, description, type, image_name AS imageName, confirmed, user_first_name AS userFirstName, user_uin AS userUin FROM locations WHERE id = ?';
		var data = [request.params.id];
		
		c.query(sql, data, (error, result, fields) => {
			if (error) {
				c.release();
				return response.status(500).send(error);
			}
			
			c.release();
			if(!!result[0]) {
				response.send(result[0]);
			} else {
				response.status(401).send('Image not found');
			}
		});
	});
	
});

// CREATE
app.post('/locations', authenticateJWT, checkRole('ADMIN'), function(request, response) {
	// TODO validation
	
	connection.getConnection(function(cError, c) {
		if (cError) {
			c.release();
			return response.status(500).send(cError);
		}
		
		var sql = "INSERT INTO locations (title, description, lat, lng, image, image_name, type, user_first_name, user_uin, confirmed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		var data = [request.body.title, request.body.description, request.body.lat, request.body.lng, request.body.image, request.body.image_name, request.body.type, request.body.userFirstName, request.body.userUin, 0];
		
		c.query(sql, data, (error, result, fields) => {
			if (error) {
				c.release();
				return response.status(500).send(error);
			}
			
			c.release();
			response.send(result);
		});
	});
});


// UPDATE
app.put('/locations/:id(\\d+)', authenticateJWT, checkRole('ADMIN'), function(request, response) {
	// TODO validation
	
	connection.getConnection(function(cError, c) {
		if (cError) {
			c.release();
			return response.status(500).send(cError);
		}
		
		var sql = "UPDATE locations SET title = ?, description = ?, type = ? WHERE id = ?";
		var data = [request.body.title, request.body.description, request.body.type, request.params.id];
		
		c.query(sql, data, (error, result, fields) => {
			if (error) {
				c.release();
				return response.status(500).send(error);
			}
			
			c.release();
			response.send(result);
		});
	});
});

app.put('/locations/:id(\\d+)/image', authenticateJWT, checkRole('ADMIN'), function(request, response) {
	// TODO validation
	
	connection.getConnection(function(cError, c) {
		if (cError) {
			c.release();
			return response.status(500).send(cError);
		}
		
		var sql = "UPDATE locations SET image = ? WHERE id = ?";
		var data = [request.body.image, request.params.id];
		
		c.query(sql, data, (error, result, fields) => {
			if (error) {
				c.release();
				return response.status(500).send(error);
			}
			
			c.release();
			response.send(result);
		});
	});
});

app.delete('/locations/:id(\\d+)', authenticateJWT, checkRole('ADMIN'), function(request, response) {
	connection.getConnection(function(cError, c) {
		if (cError) {
			c.release();
			return response.status(500).send(cError);
		}
		
		var sql = "DELETE FROM locations WHERE id = ?";
		var data = [request.params.id];
		
		c.query(sql, data, (error, result, fields) => {
			if (error) {
				c.release();
				return response.status(500).send(error);
			}
			
			c.release();
			response.send(result);
		});
	});
});

app.put('/locations/:id(\\d+)/confirmed/toggle', authenticateJWT, checkRole('ADMIN'), function(request, response) {
	// TODO validation
	
	connection.getConnection(function(cError, c) {
		if (cError) {
			c.release();
			return response.status(500).send(cError);
		}
		
		var sqlSelect = 'SELECT id, confirmed FROM locations WHERE id = ?';
		var sqlSelectData = [request.params.id];
		
		c.query(sqlSelect, sqlSelectData, (error, sqlSelectResult, fields) => {
			if (error) {
				c.release();
				return response.status(500).send(error);
			}
			
			if (!sqlSelectResult[0]) {
				c.release();
				return response.status(404).send('Entity not found');
			}
			
			var sqlUpdate = "UPDATE locations SET confirmed = ? WHERE id = ?";
			var sqlUpdateData = [Math.abs(sqlSelectResult[0].confirmed - 1), request.params.id];
			
			c.query(sqlUpdate, sqlUpdateData, (error, sqlUpdateResult, fields) => {
				if (error) {
					c.release();
					return response.status(500).send(error);
				}
				
				c.release();
				response.send(sqlUpdateResult);
			});
		});
	});
});

app.get('/locations/top', function(request, response) {
	connection.getConnection(function(cError, c) {
		if (cError) {
			c.release();
			return response.status(500).send(cError);
		}
		
		var sql = 'SELECT (SELECT l2.user_first_name FROM locations l2 WHERE l2.user_uin = l.user_uin ORDER BY l2.id DESC limit 1) AS userFirstName, count(l.id) as count FROM locations l WHERE l.user_uin <> 0 GROUP BY l.user_uin';
		
		c.query(sql, (error, result, fields) => {
			if (error) {
				c.release();
				return response.status(500).send(error);
			}
			
			c.release();
			response.send(result);
		});
	});
});


// user
app.get('/user', authenticateJWT, (request, response) => {
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
app.post('/login', validateTgHash, function(request, response) {
	try {
		connection.getConnection(function(cError, c) {
			if (cError) {
				c.release();
				return response.status(500).send(cError);
			}
			
			c.query('SELECT * FROM users WHERE uin = ? ', [request.body.id], (error, result, fields) => {
				if (error) {
					c.release();
					return response.status(500).send(error);
				}
				
				if (!!result[0]) {
					c.release();
					
					// try {
						// let token = jwt.sign({ id: request.body.id }, JWT_SECRET, { expiresIn: 86400 });
						
						// response.send(`Login success as ${result[0].first_name} with role ${result[0].role} token ${token}`);
					// } catch (er) {
						// response.send(`${er}`);
					// }
					const tgUser = { ...request.tgUser, role: result[0].role };
					const token = jwt.sign(tgUser, JWT_SECRET, { expiresIn: 86400 });
					
					response.send({
						auth: true,
						token: token,
						user: tgUser
					});
				} else {
					var sql = "INSERT INTO users (first_name, username, uin, photo_url, role) VALUES (?, ?, ?, ?, ?)";
					var data = [request.body.first_name, request.body.username, request.body.id, request.body.photo_url, 'USER'];
					
					c.query(sql, data, (error, result, fields) => {
						if (error) {
							c.release();
							return response.status(500).send(error);
						}
				
						c.release();
						
						const tgUser = { ...request.tgUser, role: 'USER' };
						let token = jwt.sign(tgUser, JWT_SECRET, { expiresIn: 86400 });
						
						response.send({
							auth: true,
							token: token,
							user: tgUser
						});
					});
				}
			});
		});
			
		// response.send(`secret_key ${hex} hash ${hash} equals? ${hex === hash}`);
	} catch(e) {
		response.send(`${e}`);
	}
});

app.get('/logout', (request, response) => {
    req.session.destroy();
    res.redirect('https://electrotallinn.ee/map');
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
		var sql = 'SELECT id, title, lat, lng, description, type, image_name AS imageName, confirmed, user_first_name AS userFirstName, user_uin AS userUin FROM locations where id = ?';
	
		let locations = await query(sql, [16]);
		response.send(locations);
	} catch (e) {
		return response.status(500).send(e);
	}
});

const query = (sql, params) =>{
    return new Promise((resolve, reject)=>{
        connection.query(sql, params || [], (error, result) => {
            if (error){
                return reject(error);
            }
            return resolve(result);
        });
    });
};


module.exports = app