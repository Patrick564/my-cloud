const router = require('express').Router();
const path = require('path');

const processPath = require('../lib/path');

router.post('/:path*?', async (req, res) => {
    let dir = processPath(req.params.path, req.params['0']);
    let content = req.files;
    let contentStats = { names: [], sizes: 0 };
    
    if (!content) {
        return res.status(400).send({
            message: 'No files selected to upload.',
            success: false,
            path: dir,
        });
    }

    if (!Array.isArray(content.files)) {
        content.files.mv(path.join(dir.absolutePath, content.files.name));
        contentStats.names.push(content.files.name);
        contentStats.sizes += content.files.size / (1024 * 1024);
    } else {
        content.files.forEach((file) => {
            file.mv(path.join(dir.absolutePath, file.name));
            contentStats.names.push(file.name);
            contentStats.sizes += file.size / (1024 * 1024);
        });
    }

    res.json({
        message: 'File(s) upload successfully.',
        success: true,
        path: dir,
        contentStats,
    });
});

module.exports = router;
