const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PageSchema = new Schema({
  page: String,
  page_type: String,
  hero: {
    h1: String,
    small: String,
    p: String,
    img_url: String,
  },
  content: [
    {
      h2: String,
      small: String,
      p: [String],
      read_more: String,
      background_img_url: String,
      img_src: String,
    },
  ],
});
const Page = mongoose.model('Page', PageSchema);

async function addPage(page, hero, content) {
  const newPage = new Page({
    page: page,
    hero: hero,
    content: content,
  });

  let saved = await newPage.save();
}

async function get(page) {
  return Page.findOne({ page: page });
}

module.exports = {
  model: Page,
  addPage: addPage,
  get: get,
};
