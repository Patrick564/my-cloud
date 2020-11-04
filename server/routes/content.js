// JavaScript imports
const router = require('express').Router();
const fs = require('fs');
const path = require('path');

// Lib imports
const processPath = require('../lib/path');

router.get('/:path*?', async (req, res) => {
    let dir = processPath(req.params.path, req.params['0']);

    // WithFileType is true for isDirectory method work
    fs.readdir(dir.absolutePath, { withFileTypes: true }, (error, files) => {
        let content = { directories: [], files: [] };
        
        if (error) {
            return res.status(400).json({
                message: 'Directory not finded.',
                error: error.code,
            });
        }

        files.map((file) => {
            if (file.isDirectory()) {
                content.directories.push(file.name);
            } else {
                content.files.push(file.name);
            }
        });

        res.json({
            message: 'Content show successfully.',
            path: dir,
            content,
        });
    });
});

router.post('/:path*?', async (req, res) => {
    let dir = processPath(req.params.path, req.params['0']);
    let name = req.body.name;
    let dirPath = path.join(dir.absolutePath, name);
    
    if (!name) {
        return res.status(400).json({
            message: 'Enter a valid name.',
        });
    }

    fs.mkdir(dirPath, (error) => {
        if (error) {
            if (error.code === 'EEXIST') {
                return res.status(400).json({
                    message: 'The folder already exist.',
                    path: dir,
                });
            } else if (error.code === 'ENOENT') {
                return res.status(400).json({
                    message: 'Route not finded.',
                    path: dir,
                });
            }
        }

        res.status(200).json({
            message: 'Directory created.',
            path: dir,
            name,
        });
    }); 
});

router.patch('/:path*?', async (req, res) => {
    let dir = processPath(req.params.path, req.params['0']);
    let oldName = req.body.oldName;
    let newName = req.body.newName;
    let extension = path.extname(oldName);
    let oldPath = dir.absolutePath + oldName;
    let newPath = dir.absolutePath + newName + extension;

    fs.rename(oldPath, newPath, (error) => {
        if (error) {
            return res.status(400).json({
                message: 'An error ocurred.',
                error: error.code,
            });
        }

        res.status(200).json({
            message: 'Rename complete.',
            path: dir,
            oldName,
            newName,
        });
    });
});

router.delete('/:path*?', async (req, res) => {
    let dir = processPath(req.params.path, req.params['0']);
    let name = req.body.name;
    let dirPath = dir.absolutePath + name;

    if (!name) {
        return res.status(400).json({
            message: 'No file or folder selected.'
        });
    }

    fs.stat(dirPath, (error, stats) => {
        if (error) {
            if (error.code === 'ENOENT') {
                return res.status(400).json({
                    message: 'Route not finded.',
                    path: dir,
                });
            }
        }

        if (stats.isDirectory()) {
            fs.rmdir(dirPath, { recursive: true }, (error) => {
                if (error) {
                    return res.status(400).json({
                        message: 'Some error happen.',
                        error: error.code,
                    });
                }

                res.status(200).json({
                    message: 'Folder deleted.',
                    name,
                    path: dir,
                });
            });
        } else {
            fs.unlink(dirPath, (error) => {
                if (error) {
                    return res.status(400).json({
                        message: 'Some error happen.',
                        error: error.code,
                    });
                }

                res.status(200).json({
                    message: 'File deleted.',
                    name,
                    path: dir,
                });
            });
        }
    });
});

module.exports = router;
