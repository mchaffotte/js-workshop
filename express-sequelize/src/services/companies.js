const db = require("../repository");
const Company = db.companies;

exports.findAll = () => {
  return Company.findAll();
};

exports.create = (company) => {
  if (!company.name) {
    const emptyNameError = new Error("The company name cannot be empty");
    emptyNameError.code = "ILLEGAL_ARGUMENT";
    throw emptyNameError;
  }
  const { name } = company;
  return Company.create({ name });
};
