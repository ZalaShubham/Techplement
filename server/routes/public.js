const express = require("express");
const router = express.Router();
const { getHome, getSignIn, getSignUp } = require("../controllers/public");

router.get("/", getHome);
router.get("/sign-in", getSignIn);
router.get("/sign-up", getSignUp);

module.exports = router;
