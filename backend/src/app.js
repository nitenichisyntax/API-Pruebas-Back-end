const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

app.use(require('./routes/users'));

app.use(require('./routes/alerts'));

module.exports = app;