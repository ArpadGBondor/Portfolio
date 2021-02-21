const debug = require('debug')('portfolio:page-middleware');
const contactDB = require('../models/contact');

// Date() of the last time the cash was refreshed in millisecond
let lastTimeRefreshed = null;
// cash time in millisecond: 1 hour
let cashTime = 1 * 60 * 60 * 1000;

let myvar = '';
let contactLinks = [];
let socialLinks = [];

module.exports = (req, res, next) => {
  refreshCash()
    .then(() => {
      // This middleware defines variables that I can use on every page in the headers and footers

      // for testing
      res.locals.myvar = 'Last time the cash was refreshed: ' + new Date(lastTimeRefreshed);
      // Contact info + Social media links for footer
      res.locals.contactLinks = contactLinks;
      res.locals.socialLinks = socialLinks;

      next();
    })
    .catch(next);
};

async function refreshCash() {
  if (!lastTimeRefreshed || +new Date() - lastTimeRefreshed > cashTime) {
    lastTimeRefreshed = +new Date();
    try {
      contactLinks = await contactDB.get('contact');
      socialLinks = await contactDB.get('social');
    } catch (error) {
      // If there are DB issues, I still want the page to show without contact details
      contactLinks = [];
      socialLinks = [];
    }
  }
}
