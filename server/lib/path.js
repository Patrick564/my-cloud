require('dotenv').config();

const path = require('path');
const root = process.env.ROOT;

function processPath(...urlPath) {
    let relativePath = '/' + (urlPath[0] || '') + (urlPath[1] || '');
    let absolutePath = path.join(root, relativePath);

    return { absolutePath, relativePath };
}

module.exports = processPath;
