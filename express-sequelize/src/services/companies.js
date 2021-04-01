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

exports.delete = (id) => {
  return Company.destroy({
    where: { id },
  });
};

exports.findOne = async (id) => {
  const company = await Company.findByPk(id);
  if (!company) {
    const notFoundError = new Error("The company was not found");
    notFoundError.code = "NOT_FOUND";
    throw notFoundError;
  }
  return Company.findByPk(id);
};
