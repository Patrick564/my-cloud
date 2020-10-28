const router = require('express').Router();
const fs = require('fs');

const rootPath = '../files/';

// router.get(/:path*/, async (req, res) => {
//     let dirPath = rootPath + (req.params.path || '');

//     fs.readdir(dirPath, { withFileTypes: true }, (error, content) => {
//         if (error) {
//             return res.json({
//                 message: 'Directory not finded',
//             });
//         }

//         let directories = Array();
//         let files = Array();

//         content.map((file) => {
//             if (file.isDirectory()) {
//                 directories.push(file.name);
//             } else {
//                 files.push(file.name);
//             }
//         });
        
//         res.json({
//             path: dirPath,
//             content: {
//                 directories,
//                 files,
//             },
//         });
//     });
// });

// Create directory
router.post('/content', async (req, res, next) => {
    if (!req.body.dir) {
        // res.status(400).json({
        //     message: 'No name',
        //     success: false,
        // });

        next();
    }

    fs.mkdir(rootPath + '/' + req.body.dir, (e) => { return e });
    
    res.json({
        message: 'Directory created',
        dirName: req.body.dir,
    });
});

// Upload file(s)
router.post('/content', async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            res.status(400).send({ message: `No files selected` });

            next();
        }

        let files = req.files.files;
        let fileNames = [];
        let fileSize = 0;

        files.forEach((file) => {
            file.mv('../files/' + file.name);
            fileNames.push(file.name);
            fileSize += file.size;
        });

        res.json({
            message: 'File(s) upload',
            fileName: fileNames,
            size: `${Math.round(fileSize / 1048576, -2)}mb`,
        });
    } catch (error) {
        res.json({
            message: 'Error to upload file(s)'
        });
    }
});

module.exports = router;
