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

module.exports = router;
