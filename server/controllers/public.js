function getHome(req, res) {
  res.render("src/index", { pageTitle: "📑 Daily Quotes" });
}

function getSignIn(req, res) {
  try {
    const token = req.cookies?.token;
    if (token) {
      res.redirect("/home");
    }
    res.render("src/pages/signIn", { pageTitle: "🔑 Sign In" });
  } catch (error) {
    console.log("Error:", error);
    return res.render("src/pages/error", {
      pageTitle: "⁉ |Error - Something Went Wrong",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
}

function getSignUp(req, res) {
  try {
    const token = req.cookies?.token;
    if (token) {
      return res.redirect("/home");
    }
    return res.render("src/pages/signUp", { pageTitle: "✏ Sign Up" });
  } catch (error) {
    console.log("Error:", error);
    return res.render("src/pages/error", {
      pageTitle: "⁉ |Error - Something Went Wrong",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
}
module.exports = { getHome, getSignIn, getSignUp };
