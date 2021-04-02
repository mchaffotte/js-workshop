const employeesController = require("../controllers/employees");
const router = require("express").Router();

router.get("/", employeesController.findAndCountAll);

router.post("/", employeesController.create);

router.put("/:id", employeesController.update);

router.delete("/:id", employeesController.delete);

router.get("/:id", employeesController.findOne);

module.exports = router;
