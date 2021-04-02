const employeeService = require("../services/employees.js");
const converter = require("./converter");

const router = require("express").Router();

exports.findAndCountAll = async (req, res) => {
  const limit = converter.getNumberFromString(req.query.limit);
  const offset = converter.getNumberFromString(req.query.offset);
  try {
    const { count, rows } = await employeeService.findAndCountAll(
      offset,
      limit
    );
    res.status(201).send({ total: count, data: rows });
  } catch (err) {
    console.log(err);
    res.status(409).send({
      message: err.message || "An error occurs while retriving employees",
    });
  }
};

exports.create = async (req, res) => {
  try {
    const employee = await employeeService.create(req.body);
    res.send(employee);
  } catch (err) {
    console.log(err);
    const status = err.code === "ILLEGAL_ARGUMENT" ? 400 : 409;
    const message = !!err.errors ? err.errors[0].message : err.message;
    res.status(status).send({
      message: message || "An error occurs while creating the employee",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const employee = await employeeService.update(req.params.id, req.body);
    res.send(employee);
  } catch (err) {
    console.log(err);
    res.status(409).send({
      message: err.message || "An error occurs while updating the employee",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    await employeeService.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(409).send({
      message: err.message || "An error occurs while deleting the employee",
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const employee = await employeeService.findOne(req.params.id);
    res.send(employee);
  } catch (err) {
    console.log(err);
    if (err.code === "NOT_FOUND") {
      res.status(404).send();
      return;
    }
    res.status(500).send({
      message: err.message || "An error occurs while retrieving the employee",
    });
  }
};
