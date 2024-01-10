const { Router } = require("express");
const {
  handleSignUp,
  handleLogIn,
  handleCreateUser,
  handleSignIn,
  handleLogOut,
} = require("../controllers/user");
const router = Router();

router.get("/signup", handleSignUp);
router.get("/signin", handleLogIn);

router.post("/signup", handleCreateUser);
router.post("/signin", handleSignIn);
router.get("/logout", handleLogOut);

module.exports = router;
