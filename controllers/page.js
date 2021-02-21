const { get } = require('../models/page');

module.exports = {
  page(route, menu, req, res, next) {
    get(route)
      .then((results) => {
        if (!results) {
          return next();
        }
        res.locals.hero = results.hero;
        res.locals.content = results.content;
        res.locals.title = menu;
        res.locals.activeMenu = menu;
        res.render(results.page_type);
      })
      .catch(next);
  },
};
