const router = require('express').Router();

const processPath = require('../lib/path');

router.post('/:path*?', (req, res) => {
    let dir = processPath(req.params.path, req.params['0']);

    res.download(dir.absolutePath + req.body.name);
});

module.exports = router;
