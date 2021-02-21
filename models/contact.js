const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ContactSchema = new Schema({
  type: String, // 'contact' / 'social'
  icon: String, // Font Awsome class name
  name: String, // 'Phone'
  address: String, // phone number, e-mail address, social link
  link: String, // href for the link if needed
});
const Contact = mongoose.model('Contact', ContactSchema);

async function add(type, icon, name, address, link) {
  const newContact = new Contact({
    type: type,
    icon: icon,
    name: name,
    address: address,
    link: link,
  });

  let saved = await newContact.save();
}

async function get(type) {
  const results = await Contact.find({ type: type }).exec();
  return results;
}

module.exports = {
  model: Contact,
  add: add,
  get: get,
};
