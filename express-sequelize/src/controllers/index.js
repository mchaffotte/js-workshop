const companiesController = require("./companies");
const employeesController = require("./employees");

module.exports = (app) => {
  app.use("/api/companies", companiesController);
  app.use("/api/employees", employeesController);
};
