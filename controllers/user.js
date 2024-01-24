const User = require("../models/user");

async function handleSignUp(req, res) {
  return res.render("signup");
}

async function handleLogIn(req, res) {
  return res.render("signin");
}

async function handleCreateUser(req, res) {
  const { fullName, email, password } = req.body;
  const result = await User.create({
    fullName,
    email,
    password,
  });
  console.log(result);
  return res.redirect("/");
}

async function handleSignIn(req, res) {
  const { email, password } = req.body;
  try {
    const token = await User.matchPassword(email, password);
    //console.log("token", token);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect Email or Password",
    });
  }
}

async function handleLogOut(req, res) {
  res.clearCookie("token").redirect("/");
}

module.exports = {
  handleSignUp,
  handleLogIn,
  handleCreateUser,
  handleSignIn,
  handleLogOut,
};
