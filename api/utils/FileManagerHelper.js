const utils = require("../utils/Utils.js");

const FILE_MANAGER_HOST = 'files.electrotallinn.ee';
const FILE_MANAGER_PORT = 443;

module.exports = {

    create: async (fileDir, fileB64, fileName, authHeader) => {
        const data = new TextEncoder().encode(
            JSON.stringify({
                fileName: fileName,
                fileB64: fileB64
            })
        );

        const options = {
            hostname: FILE_MANAGER_HOST,
            port: FILE_MANAGER_PORT,
            path: '/' + fileDir,
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        try {
            return await utils.requestPromise(options, data);
        } catch (e) {
            console.error(e);
            throw { error: `Failed to send file ${fileName}` };
        }
    },

    delete: async (fileDir, fileName, authHeader) => {
        const options = {
            hostname: FILE_MANAGER_HOST,
            port: FILE_MANAGER_PORT,
            path: `/${fileDir}/${fileName}`,
            method: 'DELETE',
            headers: {
                'Authorization': authHeader
            }
        };

        try {
            return await utils.requestPromise(options);
        } catch (e) {
            console.error(e);
            throw { error: `Failed to delete file ${fileName}` };
        }
    }
};
