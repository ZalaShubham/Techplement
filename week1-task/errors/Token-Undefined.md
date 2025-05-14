# Cannot read properties of undefined (reading 'token')

> [!WARN]
>
> ### Error: TypeError: Cannot read properties of undefined (reading 'token') at authenticatedUser (D:\Daily-Quotes\server\middleware\authMiddleware.js:5:29)

This error "Cannot read properties of undefined (reading 'token')" means that req.cookies is undefined. This usually happens when cookie parsing middleware is missing in your Express app.

## ✅ Fix: Enable Cookie Parser in Express

### 1️⃣ Install cookie-parser if not installed

Run this in your terminal:

```sh
npm install cookie-parser

```

### 2️⃣ Use cookie-parser in server.js

Modify your server.js (or app.js):

```js
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

// Enable cookie parsing
app.use(cookieParser());
```

## 🔹 Update Your Middleware (authMiddleware.js)

Now, modify your authMiddleware.js:

```js
const jwt = require("jsonwebtoken");

function authenticateUser(req, res, next) {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.redirect("/login"); // Redirect if no token
  }

  try {
    const decoded = jwt.verify(token, "text");
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Token verification failed:", error);
    return res.redirect("/login");
  }
}

module.exports = authenticateUser;
```
