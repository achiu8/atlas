require('dotenv').config()
const express = require('express');
const google = require('./routes/google');
const dropbox = require('./routes/dropbox');
const indexRouter = require('./routes/index');

const app = express();
const port = process.env.PORT || 3001;

app.use('/google', google);
app.use('/dropbox', dropbox);
app.use('/', indexRouter);

app.listen(port, () => console.log(`Listening on port ${port}...`));
