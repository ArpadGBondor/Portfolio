const debug = require('debug')('portfolio:contact-control');
const nodemailer = require('nodemailer');

module.exports = {
  contactPostMessage(req, res, next) {
    const { name, email, message } = req.body;

    // How to set Google for this: https://www.youtube.com/watch?v=JJ44WA_eV8E&ab_channel=Kif-Dev

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: process.env.GOOGLE_ACCESS_TOKEN,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: `"Portfolio Web App" <${process.env.EMAIL_USER}>`,
      to: `<${process.env.EMAIL_USER}>`,
      subject: ' - New Message from Portfolio - ',
      text: `From: ${name}
E-mail: ${email}

Message:
${message}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        debug(error);
        res.render('contact/failure', { title: 'Failed Message', activeMenu: 'Contact Me' });
      } else {
        res.render('contact/success', { title: 'Successfull Message', activeMenu: 'Contact Me' });
      }
    });
  },
};
