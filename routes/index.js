const indexController = require("./../controllers/index");

module.exports = app => {
  app.get("/", indexController.index);

  app.post("/suggest", indexController.search);
};