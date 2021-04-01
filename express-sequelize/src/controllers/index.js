const companiesController = require("./companies");

module.exports = (app) => {
  app.use("/api/companies", companiesController);
};
