const config = require('../config.js');

module.exports = function serverHandler(req, res) {
    console.log(`listening on port ${config.port}`);
    res.end('toto');
};
