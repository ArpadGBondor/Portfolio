const https = require('https');
const debug = require('debug')('portfolio:newsletter-control');

module.exports = {
  newsletterPost(req, res, next) {
    // API key
    const apiKey = process.env.MAILCHIMP_API_KEY;
    // List ID
    const listID = process.env.MAILCHIMP_LIST_ID;
    // Server No.
    const serverNumber = process.env.MAILCHIMP_SERVER_NUMBER;

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    // debug(`First name: ${firstName}`);
    // debug(`Last name: ${lastName}`);
    // debug(`E-mail: ${email}`);

    var data = {
      members: [
        {
          email_address: email,
          status: 'subscribed',
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName,
          },
        },
      ],
      update_existing: true,
    };

    const jsonData = JSON.stringify(data);
    // debug('JSON Data: ', jsonData);
    const url = 'https://' + serverNumber + '.api.mailchimp.com/3.0/lists/' + listID;
    const options = {
      method: 'POST',
      auth: 'Newsletter_NodeJS:' + apiKey,
    };
    // debug(`URL: ${url}`);
    // debug(`Options: ${options}`);
    const request = https.request(url, options, function (response) {
      if (response.statusCode == 200) {
        res.render('newsletter/success', { title: 'Successful Signup', activeMenu: 'Newsletter' });
      } else {
        res.render('newsletter/failure', { title: 'Signup Failed', activeMenu: 'Newsletter' });
      }
      response.on('data', function (data) {
        // debug('Data: ', JSON.parse(data));
      });
    });
    request.write(jsonData);
    request.end();
  },
};
