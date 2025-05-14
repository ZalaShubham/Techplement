# Issue: req.user Might Be Undefined

The Issue is getSignUp function correctly prevents signed-in users from accessing the sign-up page by redirecting them to /home. However, there's one issue:

### 🛑 Issue: req.user Might Be Undefined

Here my req.user comes from the authentication middleware (authenticateUser). However, for routes like /signup and /login, the authentication middleware is not applied, so req.user will always be undefined.

## How I ✅ Fix: Use Token Check in getSignUp

Modify your function to check for a token in cookies manually.

### 🔹 Updated Code:

```js
function getSignUp(req, res) {
  try {
    const token = req.cookies?.token; // Check if the token exists

    if (token) {
      return res.redirect("/home"); // Redirect if user is already logged in
    }

    res.render("src/pages/signUp", { pageTitle: "✏ Sign Up" });
  } catch (error) {
    console.log("Error:", error);
    return res.render("src/pages/error", {
      pageTitle: "⁉ | Error - Something Went Wrong",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
}
```

### ✅ What I Changed?

- Check req.cookies?.token: If a token exists, it means the user is logged in.
- Redirect to /home if logged in.
- No crash if req.cookies is undefined.
