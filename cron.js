const User = require('./models/userModel');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
require('dotenv').config();

// cron.schedule('*/10 * * * * *', function () {
//   let data = `Hii cron job running every 10 sec ${new Date()}\n`;
//   fs.appendFile('logs.txt', data, function (err) {
//     if (err) throw err;
//     console.log('file data added');
//   });
//   console.log('running a task every sec');
// });
const sendMailToAllUser = async (emails) => {
  try {
    console.log('config.emailUser', process.env.EMAIL_USER);
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD_SMTP,
      },
    });
    const mailOptions = {
      from: config.emailUser,
      to: emails,
      subject: 'Sending Email using Node.js',
      text: 'That was easy!',
      html: '<h1>Welcome</h1><p>That was easy!</p>',
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const sendMailAllUser = async () => {
  try {
    cron.schedule('*/10 * * * * *', async function () {
      const users = await User.find();
      console.log(users);
      if (!users.length) return console.log('No user found');
      if (users.length > 0) {
        let emails = [];
        users.map((key) => {
          emails.push(key.email);
        });
        console.log(emails);
        sendMailToAllUser(emails);
      }
    });
  } catch (error) {
    return res.json(
      CustomResponse.APIErrorResponse(null, error.message, false)
    );
  }
};
module.exports = { sendMailAllUser };
