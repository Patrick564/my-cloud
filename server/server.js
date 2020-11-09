const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const contentRouter = require('./routes/content');
const uploadRouter = require('./routes/upload');
const downloadRouter = require('./routes/download');

const app = express();

const port = 5000;

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());
app.use(cors());

// Routing
app.get('/', (req, res) => res.redirect('/content'));
app.use('/content', contentRouter);
app.use('/upload', uploadRouter);
app.use('/download', downloadRouter);

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
