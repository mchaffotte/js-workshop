const companiesController = require("../controllers/companies");
const router = require("express").Router();

router.get("/", companiesController.findAndCountAll);

router.post("/", companiesController.create);

router.put("/:id", companiesController.update);

router.delete("/:id", companiesController.delete);

router.get("/:id", companiesController.findOne);

module.exports = router;
