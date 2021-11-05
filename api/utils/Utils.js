import { Buffer } from 'buffer';

const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
//const Buffer = require('buffer');

const JWT_SECRET = "supersecretjwtada8sd8a7d9ad79a";

module.exports = {
    // validates telegram hash
    validateTgHash: (request, response, next) => {
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

            request.tgUser = {
                firstName: tgUserData.first_name,
                uin: tgUserData.id,
                photoUrl: tgUserData.photo_url
            };

            next();
        } catch(e) {
            return response.status(401).send(`Login failed. ${e}`);
        }
    },

    // read JWT
    verifyJWT: (request, response, next) => {
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
            next();
        }
    },

    signJWT: (tgUser) => {
        return jwt.sign(tgUser, JWT_SECRET, { expiresIn: 86400 });
    },

    checkRole: (role) => {
        return (request, response, next) => {
            if (request.user && request.user.role === role) {
                next();
            } else {
                console.warn('User %s does not have role %s', request.user, role);
                response.status(403).send('Restricted');
            }
        };
    },

    checkAuthentication: (request, response, next) => {
        if (request.user) {
            next();
        } else {
            console.error('Auth header missing');
            response.sendStatus(401);
        }
    },

    convertPropsToCamelcase: (obj) => {
        let convertSnakeCamelcase = (string) => string.split('_').map((element, i) => i === 0 ? element : `${element[0].toUpperCase()}${element.slice(1)}`).join('');

        return Object.assign({}, ...Object.keys(obj).map(key => ({[convertSnakeCamelcase(key)]: obj[key]})))
    },

    /**
     * rotate image
     * @param image
     * @param degree
     * @returns {Promise<Buffer>}
     */
    rotateImage: async (image, degree) => {
        return await sharp(image)
            .rotate(degree)
            .toBuffer();
    },

    /**
     * resize image
     * @param image
     * @param options
     * @returns {Promise<Buffer>}
     */
    resizeImage: async (image, options) => {
        const {width = 300, height = 300} = options || {};
        return await sharp(image)
            .resize({ width: width, height: height, fit: 'inside' })
            .toBuffer();
    },

    uuid: () => uuidv4(),

    b64ToBuffer: (b64String) => {
        return Buffer.from(b64String, 'base64');
    }
};
