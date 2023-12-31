const express = require('express');
const logger = require('morgan');
// const moment = require('moment');
// const fs = require('fs/promises');
const cors = require('cors');
require('dotenv').config();

const authRouter = require('./routes/api/auth');
const contactsRouter = require('./routes/api/contacts');
const idpHelpRouter = require('./routes/api/idpHelp');
const disHelpRouter = require('./routes/api/disHelp');
const childrenHelpRouter = require('./routes/api/childrenHelp');
const mainCollectionRouter = require('./routes/api/mainCollectionList');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// app.use(async (req, res, next) => {
//   const { method, url } = req;
//   const date = moment().format('DD-MM-YYYY_hh:mm:ss');
//   await fs.appendFile('server.log', `\n${method} ${url} ${date}`);
//   next();
// });

app.use('/api/auth', authRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/idpHelp', idpHelpRouter);
app.use('/api/disHelp', disHelpRouter);
app.use('/api/childrenHelp', childrenHelpRouter);
app.use('/api/mainCollection', mainCollectionRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;

  res.status(status).json({ message: message });
});

module.exports = app;
