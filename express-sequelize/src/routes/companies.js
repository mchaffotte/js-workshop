const companiesController = require("../controllers/companies");
const router = require("express").Router();

router.get("/", companiesController.findAndCountAll);

router.post("/", companiesController.create);

router.put("/:id", companiesController.update);

router.delete("/:id", companiesController.delete);

router.get("/:id", companiesController.findOne);

router.put("/:id/employees/:employeeId", companiesController.addEmployee);

router.get("/:id/employees", companiesController.getEmployees);

module.exports = router;
