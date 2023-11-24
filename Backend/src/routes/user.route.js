const express = require("express");
const { upload } = require("../middlewares/multer.middleware");
const router = express.Router();

const {
  createAccountController,
  loginController,
  getAllUsersController,
} = require("../controllers/user.controller");
const { verifyAuthentication } = require("../middlewares/auth.middleware");

router.post(
  "/create-account",
  upload.fields([
    {
      name: "url",
      maxCount: 1,
    },
  ]),
  createAccountController
);
router.post("/login", loginController);
router.get("/all-users", verifyAuthentication, getAllUsersController);

module.exports = router;
