const express = require('express');
// const bodyParser = require('body-parser');
// const routes = require('./routes');
const fileUpload = require('express-fileupload');

const contentRouter = require('./routes/content');

const app = express();

const port = 5000;

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());

// Routing
app.get('/', (req, res) => res.send('Hi hi hi...'));
app.use('/content', contentRouter);

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
