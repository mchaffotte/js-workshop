const db = require("../repository");
const Company = db.companies;

exports.findAndCountAll = (offset = 0, limit = 10) => {
  return Company.findAndCountAll({
    limit: Math.max(10, limit),
    offset: Math.max(0, offset),
    order: ["id"],
  });
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

exports.update = async (id, company) => {
  if (!company.name) {
    const emptyNameError = new Error("The company name cannot be empty");
    emptyNameError.code = "ILLEGAL_ARGUMENT";
    throw emptyNameError;
  }
  const { name } = company;
  const updated = await Company.update(
    { name },
    {
      where: { id: id },
    }
  );
  if (updated != 1) {
    throw new Error("Unable to update the company");
  }
  return this.findOne(id);
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
