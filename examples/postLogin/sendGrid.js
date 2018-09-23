'use strict';
const nodemailer = require('nodemailer');

const sendMail = nodemailer.createTestAccount((err, account) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 587,
        secure: false,
        auth: {
            user: 'apikey',
            pass: API_KEY
        }
    });

    let mailOptions = {
        from: '"V M S" <noreply@v-m-s-52555.firebaseapp.com>',
        to: 'abhishek18296@gmail.com',
        subject: 'New Fine',
        html: '<p>Hello <b>Abhishek</b>,<p><p>New fine of Rs 550/- for not wearing helmet. Fined at station road.</p><p>Thank You!</p>'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
});

module.exports = {
    sendMail
};
