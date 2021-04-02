const db = require("../repository");
const Employee = db.employees;

const getValidationErrorMessage = (employee) => {
  if (!employee.firstName) {
    return "The employee first name cannot be empty";
  }
  if (!employee.lastName) {
    return "The employee last name cannot be empty";
  }
  return null;
};

exports.findAndCountAll = (offset = 0, limit = 10) => {
  return Employee.findAndCountAll({
    limit: Math.max(10, limit),
    offset: Math.max(0, offset),
    order: ["id"],
  });
};

exports.create = (employee) => {
  const errorMessage = getValidationErrorMessage(employee);
  if (errorMessage) {
    const emptyNameError = new Error(errorMessage);
    emptyNameError.code = "ILLEGAL_ARGUMENT";
    throw emptyNameError;
  }
  const { firstName, lastName } = employee;
  return Employee.create({ firstName, lastName });
};

exports.update = async (id, employee) => {
  const errorMessage = getValidationErrorMessage(employee);
  if (errorMessage) {
    const emptyNameError = new Error(errorMessage);
    emptyNameError.code = "ILLEGAL_ARGUMENT";
    throw emptyNameError;
  }
  const { firstName, lastName } = employee;
  const updated = await Employee.update(
    { firstName, lastName },
    {
      where: { id: id },
    }
  );
  if (updated != 1) {
    throw new Error("Unable to update the employee");
  }
  return this.findOne(id);
};

exports.delete = (id) => {
  return Employee.destroy({
    where: { id },
  });
};

exports.findOne = async (id) => {
  const employee = await Employee.findByPk(id);
  if (!employee) {
    const notFoundError = new Error("The employee was not found");
    notFoundError.code = "NOT_FOUND";
    throw notFoundError;
  }
  return employee;
};
