# How to send JsonWebToken from Back-End to Front-End when We use for Front-end the "EJS"?

To send the JWT token to the frontend and use it in an EJS view, you can handle it in a couple of ways. Here's how you can send the token in the response and use it in your EJS template:

## 1️⃣ Send Token to Frontend via Response

Instead of just redirecting the user, you can send the token to the frontend as part of the response. You can send it either as part of the rendered template or as a JSON response.

### Option A: Send Token as EJS Variable (rendering directly)

You can pass the token into your EJS template when rendering the page.

Modify the signInUser function like this:

```js
const jwt = require("jsonwebtoken");

async function signInUser(req, res) {
  try {
    const existUser = await getUserByEmail(req.body.email);

    if (!existUser) {
      return res.render("src/pages/error", {
        pageTitle: "⁉ | Error - Something Went Wrong",
        message: "This user does not signed up!",
      });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      existUser.password
    );

    if (!passwordMatch) {
      return res.render("src/pages/error", {
        pageTitle: "⁉ | Error - Something Went Wrong",
        message: "Password Incorrect!",
      });
    }

    const token = jwt.sign({ userId: existUser.id }, "text", {
      expiresIn: "1h",
    });

    // Send token to the frontend via the response object
    return res.render("home", {
      pageTitle: "Home",
      message: "Welcome back!",
      token: token, // Send token to the EJS template
    });
  } catch (error) {
    console.log(error);
    return res.render("src/pages/error", {
      pageTitle: "⁉ |Error - Something Went Wrong",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
}
```

Now, in your home.ejs or the page you're rendering, you can access the token like this:

```html
<script>
  // You can access the token here
  const token = "<%= token %>";

  // Example: Store it in localStorage (or sessionStorage)
  localStorage.setItem("authToken", token);

  console.log("Token from EJS:", token);
</script>
```

### Option B: Send Token as JSON Response (AJAX or Fetch)

Alternatively, you can send the token back to the frontend as a JSON response (useful if you're working with a frontend JavaScript framework or SPA).
In your signInUser function, return a JSON response:

```js
const jwt = require("jsonwebtoken");

async function signInUser(req, res) {
  try {
    const existUser = await getUserByEmail(req.body.email);

    if (!existUser) {
      return res.render("src/pages/error", {
        pageTitle: "⁉ | Error - Something Went Wrong",
        message: "This user does not signed up!",
      });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      existUser.password
    );

    if (!passwordMatch) {
      return res.render("src/pages/error", {
        pageTitle: "⁉ | Error - Something Went Wrong",
        message: "Password Incorrect!",
      });
    }

    const token = jwt.sign({ userId: existUser.id }, "text", {
      expiresIn: "1h",
    });

    // Send the token as a JSON response
    return res.json({ message: "Login successful", token: token });
  } catch (error) {
    console.log(error);
    return res.render("src/pages/error", {
      pageTitle: "⁉ | Error - Something Went Wrong",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
}
```

Then, in the frontend (using JavaScript), handle the JSON response:

```js
fetch("/sign-in", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: "user@example.com",
    password: "password123",
  }),
})
  .then((response) => response.json())
  .then((data) => {
    if (data.token) {
      // Store the token in localStorage or sessionStorage
      localStorage.setItem("authToken", data.token);

      console.log("Received token:", data.token);
    }
  })
  .catch((error) => console.log("Error:", error));
```
