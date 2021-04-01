const companyService = require("../services/companies.js");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const companies = await companyService.findAll();
    res.send(companies);
  } catch (err) {
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

module.exports = router;
