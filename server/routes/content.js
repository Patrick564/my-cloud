const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const rootPath = path.dirname(require.main.path) + '/files/';

router.get('/:path*?', async (req, res) => {
    let dirPath = rootPath + (req.params.path || '') + (req.params['0'] || '');

    // WithFileType is true for isDirectory method work
    fs.readdir(dirPath, { withFileTypes: true }, (error, content) => {
        if (error) {
            return res.json({
                message: 'Directory not finded',
            });
        }

        let directories = Array();
        let files = Array();

        content.map((file) => {
            if (file.isDirectory()) {
                directories.push(file.name);
            } else {
                files.push(file.name);
            }
        });

        res.json({
            path: dirPath,
            content: {
                directories,
                files,
            },
        });
    });
});

module.exports = router;
