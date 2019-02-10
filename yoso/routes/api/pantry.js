const router = require("express").Router();
const PantryController = require("../../controllers/PantryController");

// Matches with "/api/pantry"
router
  .route("/")
  .get(PantryController.findAll)
  .post(PantryController.findOrCreate);

// Matches with "/api/pantry/all"

router.route("/all").post(PantryController.findAll);

// Matches with "/api/pantry/name"

router.route("/name").post(PantryController.findOne);

// Matches with "/api/pantry/:id"
router
  .route("/:id")
  .get(PantryController.findOneById)
  .post(PantryController.findOrCreate)
  .put(PantryController.update)
  .delete(PantryController.remove);

module.exports = router;
