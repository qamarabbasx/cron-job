const express = require('express');
const cron = require('node-cron');
const app = express();
const fs = require('fs');
const customCron = require('./cron');
const mongoose = require('mongoose');

// connect to mongodb
mongoose
  .connect('mongodb://127.0.0.1:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

customCron.sendMailAllUser();

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
