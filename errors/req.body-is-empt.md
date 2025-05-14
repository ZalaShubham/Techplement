## req.body is empty

When I update a data i send put request from frontend to backend.But in the backend req.body is empty why?
I find a reason.

### Solution:

Inlude your server.js <code>app.use(express.json())</code>
Make sure you add the express.json() middleware in your server configuration to parse incoming JSON requests.

### Steps to fix this:

Add body parser middleware to parse JSON data sent in the PUT request.

```js
const express = require("express");
const app = express();

// Add this line to parse JSON bodies
app.use(express.json());
```

2. Check the headers in your fetch request to ensure it's sending JSON data with the correct headers:

```js
const response = await fetch(`/quotes/edit/${quoteId}`, {
  method: "PUT",
  headers: {
    "Content-type": "application/json",
  },
  body: JSON.stringify(updatedQuote),
  credentials: "include",
});
```

## Explanation:

express.json() and bodyParser.urlencoded({ extended: false }) are different, and each serves a distinct purpose in handling incoming request bodies.
I used a bodyParser.urlencoded({ extended: false }) so I thought this is same with express.json() but actually not.

1. express.json():

- This middleware is used for parsing incoming requests with JSON payloads.
- It converts the body of the request into a JavaScript object (using JSON.parse).
- It is necessary for handling Content-Type: application/json requests.
  Use case: If you're sending JSON data in your request body, such as in a POST or PUT request, you should use express.json().

```js
app.use(express.json());
```

2. bodyParser.urlencoded({ extended: false }):

- This middleware is used to parse URL-encoded data, which is the format used when submitting data from a form (like a standard HTML form).
- The extended: false option tells the middleware to parse the data in a simpler way (using the querystring library).

Use case: This is typically used for handling form submissions, where data is sent as application/x-www-form-urlencoded.

```js
app.use(bodyParser.urlencoded({ extended: false }));
```
