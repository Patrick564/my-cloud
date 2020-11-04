const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const rootPath = path.dirname(require.main.path) + '/files/';

router.post('/:path*?', async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.send({
                message: 'No files selected to upload.',
            });
        }

        let dirPath = rootPath + (req.params.path || '') + (req.params['0'] || '');
        let files = req.files.files;
        let fileNames = [];
        let fileSize = 0;

        files.forEach((file) => {
            file.mv(dirPath + '/' + file.name);
            fileNames.push(file.name);
            fileSize += file.size;
        });

        res.json({
            message: 'File(s) upload successfully.',
            files: fileNames,
            size: `${Math.round(fileSize / 1048576, -2)}mb`,
        });
    } catch (error) {
        res.json({
            message: 'Error to upload file(s).'
        });
    }
});

module.exports = router;
