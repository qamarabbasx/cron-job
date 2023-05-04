const express = require('express');
const cron = require('node-cron');
const app = express();
const fs = require('fs');
cron.schedule('*/10 * * * * *', function () {
  let data = `Hii cron job running every 10 sec ${new Date()}\n`;
  fs.appendFile('logs.txt', data, function (err) {
    if (err) throw err;
    console.log('file data added');
  });
  console.log('running a task every sec');
});
const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
