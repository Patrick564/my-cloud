const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const rootPath = path.dirname(require.main.path) + '/files/';

router.post('/:path*?', (req, res) => {
    let dirPath = rootPath + (req.params.path || '') + (req.params['0'] || '');

    res.download(dirPath + '/' + req.body.fileName);
});

module.exports = router;
