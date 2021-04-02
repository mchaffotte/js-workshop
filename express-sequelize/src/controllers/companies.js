const companyService = require("../services/companies.js");
const converter = require("./converter");

exports.findAndCountAll = async (req, res) => {
  const limit = converter.getNumberFromString(req.query.limit);
  const offset = converter.getNumberFromString(req.query.offset);
  try {
    const { count, rows } = await companyService.findAndCountAll(offset, limit);
    res.status(201).send({ total: count, data: rows });
  } catch (err) {
    console.log(err);
    res.status(409).send({
      message: err.message || "An error occurs while retriving companies",
    });
  }
};

exports.create = async (req, res) => {
  try {
    const company = await companyService.create(req.body);
    res.send(company);
  } catch (err) {
    console.log(err);
    const status = err.code === "ILLEGAL_ARGUMENT" ? 400 : 409;
    const message = !!err.errors ? err.errors[0].message : err.message;
    res.status(status).send({
      message: message || "An error occurs while creating the company",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const company = await companyService.update(req.params.id, req.body);
    res.send(company);
  } catch (err) {
    console.log(err);
    res.status(409).send({
      message: err.message || "An error occurs while updating the company",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    await companyService.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(409).send({
      message: err.message || "An error occurs while deleting the company",
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const company = await companyService.findOne(req.params.id);
    res.send(company);
  } catch (err) {
    console.log(err);
    if (err.code === "NOT_FOUND") {
      res.status(404).send();
      return;
    }
    res.status(500).send({
      message: err.message || "An error occurs while retrieving the company",
    });
  }
};

exports.addEmployee = async (req, res) => {
  try {
    await companyService.addEmployee(req.params.id, req.params.employeeId);
    res.status(204).send();
  } catch (err) {
    console.log(err);
    if (err.code === "NOT_FOUND") {
      res.status(404).send();
      return;
    }
    res.status(409).send({
      message:
        err.message ||
        "An error occurs while linking the employee to the company",
    });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await companyService.getEmployees(req.params.id);
    res.send(employees);
  } catch (err) {
    console.log(err);
    if (err.code === "NOT_FOUND") {
      res.status(404).send();
      return;
    }
    res.status(409).send({
      message:
        message || "An error occurs while getting the employees of the company",
    });
  }
};
