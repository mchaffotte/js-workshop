const db = require("../repository");
const Company = db.companies;

exports.findAll = () => {
  return Company.findAll();
};
