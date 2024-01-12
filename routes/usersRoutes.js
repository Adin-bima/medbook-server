const express = require("express");
const userController = require("../controllers/userController");
const userMidleware = require("../midleware/userMidleware");
const router = express.Router();

// for user
router.post("/register", userController.createUser);
router.post("/login", userController.login);
// router.get("/:userId", userController.getUserById);

// authenticated user
router.get("/me", userMidleware, userController.getCurrentUserProfile);
router.put("/me", userMidleware, userController.updateCurentUserProfile);

// for head admin
// router.put("/:userId", userController.updateUser);
// router.get("/", userController.getAllUsers);

router.delete('/:userId', userController.deleteUserById)

module.exports = router;
