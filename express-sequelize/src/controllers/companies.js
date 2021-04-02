const companyService = require("../services/companies.js");

const router = require("express").Router();

const getNumberFromString = (value) => {
  const parsed = parseInt(value);
  if (isNaN(parsed)) {
    return undefined;
  }
  return parsed;
};

router.get("/", async (req, res) => {
  const limit = getNumberFromString(req.query.limit);
  const offset = getNumberFromString(req.query.offset);
  try {
    const { count, rows } = await companyService.findAndCountAll(offset, limit);
    res.status(201).send({ total: count, data: rows });
  } catch (err) {
    console.log(err);
    res.status(409).send({
      message: err.message || "An error occurs while retriving companies",
    });
  }
});

router.post("/", async (req, res) => {
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
});

router.delete("/:id", async (req, res) => {
  try {
    await companyService.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(409).send({
      message: err.message || "An error occurs while deleting the company",
    });
  }
});

router.get("/:id", async (req, res) => {
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
});

module.exports = router;
